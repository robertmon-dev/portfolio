import cron from "node-cron";
import { PrismaClient } from "@prisma/client";
import { Logger } from "../core/logger/logger";
import { GithubFetchWorker } from "../services/github/workers/ReposFetch";
import type { Caching } from "../infrastructure/cache/types";
import type { Settings } from "../core/settings/settings";
import { GithubCommitFetchWorker } from "src/services/github/workers/CommitsFetch";

export class SchedulerInitializer {
  private logger: Logger;
  private githubWorker: GithubFetchWorker;
  private commitsWorker: GithubCommitFetchWorker;
  private scheduledTasks: cron.ScheduledTask[] = [];
  private isSyncing: boolean = false;

  constructor(db: PrismaClient, cache: Caching, settings: Settings["config"]) {
    this.logger = new Logger("Scheduler");

    this.githubWorker = new GithubFetchWorker(
      db,
      cache,
      new Logger("GithubWorker"),
      settings,
    );

    this.commitsWorker = new GithubCommitFetchWorker(
      db,
      cache,
      new Logger("CommitsWorker"),
      settings,
    );
  }

  public init(): void {
    this.logger.info("Initializing background jobs...");

    const task = cron.schedule("*/15 * * * *", () => this.runJobs());
    this.scheduledTasks.push(task);

    this.logger.info("Running initial GitHub sync...");
    this.runJobs();

    this.logger.info("Scheduler started (GitHub sync: every 15m)");
  }

  private async runJobs(): Promise<void> {
    if (this.isSyncing) {
      this.logger.warn(
        "GitHub sync is already in progress. Skipping this run.",
      );
      return;
    }

    this.isSyncing = true;

    try {
      await this.githubWorker.run();
      await this.commitsWorker.run();
    } catch (err) {
      this.logger.error("GitHub sync failed", err);
    } finally {
      this.isSyncing = false;
    }
  }

  public stop(): void {
    this.scheduledTasks.forEach((task) => task.stop());
  }
}
