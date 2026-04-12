import express, { Express } from "express";
import cors from "cors";
import { Server } from "http";
import { Settings } from "../core/settings/settings";
import { Database } from "../core/database/database";
import { Logger } from "../core/logger/logger";
import { Metrics } from "../core/metrics/metrics";
import { TrpcInitializer } from "./tRPCInitializer";
import { SchedulerInitializer } from "./schedulerInitializer";
import { WorkerInitializer } from "./workerInitializer";
import { RedisClient } from "../core/redis/redis";
import { CacheStore } from "../infrastructure/cache/cacheStore";

export class AppInitializer {
  private app: Express;
  private server: Server | null = null;
  private settings: Settings;
  private database: Database;
  private logger: Logger;
  private metrics: Metrics;
  private trpcInitializer: TrpcInitializer;
  private schedulerInitializer: SchedulerInitializer;
  private workerInitializer: WorkerInitializer;
  private redisClient: RedisClient;
  private cache: CacheStore;

  public constructor() {
    this.logger = new Logger("System");
    this.settings = Settings.getInstance();
    this.database = Database.getInstance();
    this.redisClient = RedisClient.getInstance();
    this.cache = CacheStore.getInstance();
    this.metrics = Metrics.getInstance();
    this.trpcInitializer = new TrpcInitializer();
    this.schedulerInitializer = new SchedulerInitializer(
      this.database.client,
      this.cache,
      this.settings.config,
    );
    this.workerInitializer = new WorkerInitializer(
      this.database.client,
      this.cache,
      this.settings.config,
    );

    this.app = express();
  }

  public async bootstrap(): Promise<void> {
    this.logger.info("Bootstrapping application!");

    await this.database.connect();

    this.app.use(
      cors({
        origin: this.settings.config.CORS_ORIGIN.split(","),
        credentials: true,
      }),
    );

    this.app.use(express.json());

    this.trpcInitializer.setup(this.app);
    this.schedulerInitializer.init();
    this.workerInitializer.init();

    const port = this.settings.config.PORT;
    const host =
      this.settings.config.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1";

    this.server = this.app.listen(port, host, () => {
      this.logger.info(
        `Server listening on http://localhost:${port} [Env: ${this.settings.config.NODE_ENV}]`,
      );
    });
  }

  public async shutdown(signal: string): Promise<void> {
    this.logger.warn(`Received ${signal}. Starting graceful shutdown...`);
    if (this.server) {
      this.server.closeAllConnections();

      await new Promise<void>((resolve, reject) => {
        this.server?.close((err) => {
          if (err) {
            this.logger.error("Error closing HTTP server", err);
            return reject(err);
          }

          this.logger.info("HTTP server closed.");
          resolve();
        });
      });
    }

    if (this.schedulerInitializer) {
      this.schedulerInitializer.stop();
      this.logger.info("Scheduler jobs stopped.");
    }

    await this.redisClient.close();
    this.logger.info("Redis connection closed.");

    await this.database.disconnect();
    this.logger.info("Database connection closed.");
    this.logger.info("Graceful shutdown completed");
  }
}
