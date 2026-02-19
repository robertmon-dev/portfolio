import { Octokit } from 'octokit';
import { Database } from '../../core/database/database';
import { Settings } from '../../core/settings/settings';
import { Logger } from '../../core/logger/logger';
import type { GithubApiRepo } from './types';

export class GithubFetchService {
  private static instance: GithubFetchService;
  private octokit: Octokit;
  private db: Database;
  private logger: Logger;
  private username: string;

  private constructor() {
    this.logger = new Logger('GithubService');
    this.db = Database.getInstance();
    const settings = Settings.getInstance().config;

    this.octokit = new Octokit({
      auth: settings.GITHUB_TOKEN
    });
    this.username = settings.NICKNAME;
  }

  public static getInstance(): GithubFetchService {
    if (!GithubFetchService.instance) {
      GithubFetchService.instance = new GithubFetchService();
    }

    return GithubFetchService.instance;
  }

  public async syncStats(): Promise<void> {
    this.logger.info('Starting GitHub sync...');
    const start = Date.now();

    try {
      const { data: user } = await this.octokit.rest.users.getByUsername({
        username: this.username,
      });

      const { data: repos } = await this.octokit.rest.repos.listForUser({
        username: this.username,
        per_page: 100,
        type: 'owner',
        sort: 'pushed',
        direction: 'desc'
      });

      const bestRepos: GithubApiRepo[] = repos
        .filter((repo: GithubApiRepo) => !repo.fork)
        .sort((a: GithubApiRepo, b: GithubApiRepo) => {
          const starsA = a.stargazers_count ?? 0;
          const starsB = b.stargazers_count ?? 0;
          return starsB - starsA;
        })
        .slice(0, 6);

      const totalStars = repos.reduce((acc: number, repo: GithubApiRepo) => {
        return acc + (repo.stargazers_count ?? 0);
      }, 0);

      await this.db.client.$transaction(async (tx) => {
        const stats = await tx.githubStats.upsert({
          where: { username: this.username },
          update: {
            followers: user.followers,
            publicRepos: user.public_repos,
            totalStars: totalStars,
          },
          create: {
            username: this.username,
            followers: user.followers,
            publicRepos: user.public_repos,
            totalStars: totalStars,
          },
        });

        for (const [index, repo] of bestRepos.entries()) {
          await tx.githubRepo.upsert({
            where: { url: repo.html_url },

            update: {
              name: repo.name,
              stars: repo.stargazers_count ?? 0,
              language: repo.language ?? null,
              description: repo.description ?? null,
              order: index,
              statsId: stats.id
            },

            create: {
              name: repo.name,
              url: repo.html_url,
              stars: repo.stargazers_count ?? 0,
              language: repo.language ?? null,
              description: repo.description ?? null,
              order: index,
              statsId: stats.id
            }
          });
        }

        const topUrls = bestRepos.map(r => r.html_url);

        await tx.githubRepo.deleteMany({
          where: {
            statsId: stats.id,
            url: { notIn: topUrls },
            project: { is: null }
          }
        });
      });

      const duration = Date.now() - start;
      this.logger.info(`GitHub sync completed. Time: ${duration}ms`);

    } catch (error) {
      this.logger.error('GitHub sync failed', error);
    }
  }
}
