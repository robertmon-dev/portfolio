import { Octokit } from "octokit";
import type { Logging } from "../../../core/logger/types";
import type { Caching } from "../../../infrastructure/cache/types";
import { BaseService } from "../../service";
import type { PrismaClient } from "@prisma/client";
import type { Settings } from "../../../core/settings/settings";

export class GithubCommitFetchWorker extends BaseService {
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
    this.logger.info(`GitHub Commits Sync Worker started for: ${username}`);
    const start = Date.now();

    const storedRepos = await this.db.githubRepo.findMany({
      select: { id: true, name: true },
    });

    if (storedRepos.length === 0) {
      this.logger.info(
        "No repositories found in database. Skipping commit sync.",
      );
      return;
    }

    let totalSyncedCommits = 0;

    for (const repo of storedRepos) {
      try {
        const { data: commits } = await this.octokit.rest.repos.listCommits({
          owner: username,
          repo: repo.name,
          per_page: 5,
        });

        await this.db.$transaction(async (tx) => {
          for (const apiCommit of commits) {
            const [message, ...descriptionParts] =
              apiCommit.commit.message.split("\n\n");
            const description =
              descriptionParts.length > 0
                ? descriptionParts.join("\n\n")
                : null;

            const commitDate =
              apiCommit.commit.committer?.date || apiCommit.commit.author?.date;

            await tx.githubCommit.upsert({
              where: { sha: apiCommit.sha },
              update: {
                message: message.trim(),
                description: description?.trim() ?? null,
              },
              create: {
                sha: apiCommit.sha,
                message: message.trim(),
                description: description?.trim() ?? null,
                url: apiCommit.html_url,
                date: commitDate ? new Date(commitDate) : new Date(),
                repoId: repo.id,
              },
            });
          }
        });

        totalSyncedCommits += commits.length;
      } catch (error) {
        this.logger.error(
          `Failed to fetch commits for repo: ${repo.name}`,
          error,
        );
      }
    }

    await this.invalidateGithubCache(...storedRepos);

    this.logger.info(
      `GitHub Commits Sync Worker completed in ${Date.now() - start}ms. Synced ${totalSyncedCommits} commits across ${storedRepos.length} repos.`,
    );
  }
}
