import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import fs from "fs";
import { Logger } from "../logger/logger";
import { Settings } from "../settings/settings";
import type { LogLevel, Persisting } from "./types";

export class Database implements Persisting {
  private static instance: Database;
  public readonly client: PrismaClient<Prisma.PrismaClientOptions, LogLevel>;
  private logger: Logger;

  private constructor() {
    this.logger = new Logger("Database");
    const settings = Settings.getInstance();
    const config = settings.config;
    const isDev = config.NODE_ENV === "development";

    const sslConfig = config.DB_TLS_ENABLED
      ? {
          rejectUnauthorized: config.NODE_ENV === "production",
          ca: config.DB_CA_PATH ? this.loadCA(config.DB_CA_PATH) : undefined,
        }
      : false;

    const pool = new pg.Pool({
      connectionString: config.DATABASE_URL,
      ssl: sslConfig,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    const adapter: PrismaPg = new PrismaPg(pool);

    this.client = new PrismaClient({
      adapter,
      log: isDev
        ? [
            { emit: "event", level: "query" },
            { emit: "event", level: "error" },
            { emit: "event", level: "warn" },
          ]
        : [{ emit: "event", level: "error" }],
    });

    this.setupEventListeners(isDev);
    this.setupShutdownHooks();
  }

  private setupEventListeners(isDev: boolean) {
    if (isDev) {
      this.client.$on("query", (e: Prisma.QueryEvent) => {
        this.logger.debug(`SQL Query executed`, {
          query: e.query,
          params: e.params,
          duration: `${e.duration}ms`,
        });
      });
    }

    this.client.$on("error", (e: Prisma.LogEvent) => {
      this.logger.error(`Prisma Runtime Error: ${e.message}`, undefined, {
        target: e.target,
      });
    });

    this.client.$on("warn", (e: Prisma.LogEvent) => {
      this.logger.warn(`Prisma Warning: ${e.message}`, { target: e.target });
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  private loadCA(path: string): string | undefined {
    try {
      if (fs.existsSync(path)) return fs.readFileSync(path, "utf8");
      this.logger.warn(`CA file not found at ${path}`);
    } catch (err) {
      this.logger.error(`Failed to read CA file`, err);
    }
    return undefined;
  }

  public async connect(): Promise<void> {
    try {
      await this.client.$connect();
      this.logger.info("Database connection established (TLS active)");
    } catch (error) {
      this.logger.error("Database connection failed", error);
      process.exit(1);
    }
  }

  public async disconnect(): Promise<void> {
    await this.client.$disconnect();
    this.logger.info("Database connection closed");
  }

  private setupShutdownHooks() {
    const shutdown = async () => {
      await this.disconnect();
      process.exit(0);
    };

    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
  }
}
