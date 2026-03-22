import { Octokit } from "octokit";
import type { Logging } from "../../../core/logger/types";
import type { Caching } from "../../../infrastructure/cache/types";
import { BaseService } from "../../service";
import type { GithubApiRepo } from "../types";
import type { GithubRepo, PrismaClient } from "@prisma/client";
import type { Settings } from "../../../core/settings/settings";

export class GithubFetchWorker extends BaseService {
  private octokit: Octokit;

  constructor(
    db: PrismaClient,
    cache: Caching,
    logger: Logging,
    settings: Settings["config"],
  ) {
    super(db, cache, logger, settings);
    this.octokit = new Octokit({
      auth: this.settings.GITHUB_TOKEN,
    });
  }

  public async run(): Promise<void> {
    const username = this.settings.NICKNAME;
    this.logger.info(`GitHub Sync Worker started for: ${username}`);
    const start = Date.now();

    const [{ data: user }, { data: repos }] = await Promise.all([
      this.octokit.rest.users.getByUsername({ username }),
      this.octokit.rest.repos.listForUser({
        username,
        type: "owner",
        sort: "pushed",
        direction: "desc",
      }),
    ]);

    const bestRepos = (repos as GithubApiRepo[])
      .filter((repo) => !repo.fork)
      .sort((a, b) => (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0))
      .slice(0, 6);

    const totalStars = (repos as GithubApiRepo[]).reduce((acc, repo) => {
      return acc + (repo.stargazers_count ?? 0);
    }, 0);

    const { syncedRepos, affectedProjects } = await this.db.$transaction(
      async (tx) => {
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

        const upsertedRepos: GithubRepo[] = [];

        for (const [index, repo] of bestRepos.entries()) {
          const updated = await tx.githubRepo.upsert({
            where: { url: repo.html_url },
            update: {
              name: repo.name,
              stars: repo.stargazers_count ?? 0,
              language: repo.language ?? null,
              description: repo.description ?? null,
              order: index,
              statsId: stats.id,
            },
            create: {
              name: repo.name,
              url: repo.html_url,
              stars: repo.stargazers_count ?? 0,
              language: repo.language ?? null,
              description: repo.description ?? null,
              order: index,
              statsId: stats.id,
            },
          });
          upsertedRepos.push(updated);
        }

        const topUrls = bestRepos.map((r) => r.html_url);

        await tx.githubRepo.deleteMany({
          where: {
            statsId: stats.id,
            url: { notIn: topUrls },
            project: { is: null },
          },
        });

        const projects = await tx.project.findMany({
          where: {
            githubRepoId: { in: upsertedRepos.map((r) => r.id) },
          },
          select: { id: true, slug: true },
        });

        return { syncedRepos: upsertedRepos, affectedProjects: projects };
      },
    );

    await Promise.all([
      this.invalidateGithubCache(...syncedRepos),
      this.invalidateProjectCache(...affectedProjects),
    ]);

    this.logger.info(
      `GitHub Sync Worker completed in ${Date.now() - start}ms. Synced ${syncedRepos.length} repos and invalidated ${affectedProjects.length} projects.`,
    );
  }
}
