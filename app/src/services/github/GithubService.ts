import { Octokit } from 'octokit';
import { Database } from '../../core/database/database';
import { Settings } from '../../core/settings/settings';
import { Logger } from '../../core/logger/logger';
import type { GithubRepo } from '@portfolio/shared';

export class GithubService {
  private static instance: GithubService;
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

  public static getInstance(): GithubService {
    if (!GithubService.instance) {
      GithubService.instance = new GithubService();
    }

    return GithubService.instance;
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
        sort: 'updated',
        per_page: 10,
        type: 'owner',
      });

      const totalStars = repos.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0);

      const topReposData: GithubRepo[] = repos.slice(0, 6).map((repo: any) => ({
        name: repo.name,
        url: repo.html_url,
        stars: repo.stargazers_count ?? 0,
        language: repo.language ?? null,
        description: repo.description ?? null,
      }));

      await this.db.client.githubStats.upsert({
        where: { username: this.username },
        update: {
          followers: user.followers,
          publicRepos: user.public_repos,
          totalStars: totalStars,
          topRepos: topReposData,
        },
        create: {
          username: this.username,
          followers: user.followers,
          publicRepos: user.public_repos,
          totalStars: totalStars,
          topRepos: topReposData,
        },
      });

      const duration = Date.now() - start;
      this.logger.info(`GitHub sync completed in ${duration}ms`);

    } catch (error) {
      this.logger.error('GitHub sync failed', error);
    }
  }

  public async getStats() {
    const stats = await this.db.client.githubStats.findUnique({
      where: { username: this.username }
    });

    if (!stats) return null;

    return {
      ...stats,
      topRepos: stats.topRepos as GithubRepo[]
    };
  }
}
