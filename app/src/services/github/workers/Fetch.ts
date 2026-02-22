import { Octokit } from 'octokit';
import { PrismaClient } from '@prisma/client';
import type { Logging } from '../../../core/logger/types';
import type { Caching } from '../../../infrastructure/cache/types';
import type { Settings } from '../../../core/settings/settings';
import type { GithubApiRepo } from '../types';

export class GithubFetchWorker {
  private octokit: Octokit;

  constructor(
    private readonly db: PrismaClient,
    private readonly cache: Caching,
    private readonly logger: Logging,
    private readonly settings: Settings['config']
  ) {
    this.octokit = new Octokit({
      auth: this.settings.GITHUB_TOKEN
    });
  }

  public async run(): Promise<void> {
    const username = this.settings.NICKNAME;
    this.logger.info(`GitHub Sync Worker started for: ${username}`);
    const start = Date.now();

    try {
      const [{ data: user }, { data: repos }] = await Promise.all([
        this.octokit.rest.users.getByUsername({ username }),
        this.octokit.rest.repos.listForUser({
          username,
          per_page: 100,
          type: 'owner',
          sort: 'pushed',
          direction: 'desc'
        })
      ]);

      const bestRepos = (repos as GithubApiRepo[])
        .filter(repo => !repo.fork)
        .sort((a, b) => (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0))
        .slice(0, 6);

      const totalStars = (repos as GithubApiRepo[]).reduce((acc, repo) => {
        return acc + (repo.stargazers_count ?? 0);
      }, 0);

      await this.db.$transaction(async (tx) => {
        const stats = await tx.githubStats.upsert({
          where: { username },
          update: {
            followers: user.followers,
            publicRepos: user.public_repos,
            totalStars,
          },
          create: {
            username,
            followers: user.followers,
            publicRepos: user.public_repos,
            totalStars,
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

      await Promise.all([
        this.cache.del(`github:stats:${username}`),
        this.cache.del('github:repos:list:all'),
        this.cache.del('projects:list:*')
      ]);

      this.logger.info(`GitHub Sync Worker completed in ${Date.now() - start}ms`);

    } catch (error) {
      this.logger.error('GitHub Sync Worker failed', error);
      throw error;
    }
  }
}
