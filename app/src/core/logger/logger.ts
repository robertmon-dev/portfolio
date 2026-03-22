import pino from "pino";
import { Settings } from "../settings/settings";
import type { LogMeta, Logging } from "./types";

export class Logger implements Logging {
  private static rootPino: pino.Logger;
  private logger: pino.Logger;

  constructor(context: string) {
    if (!Logger.rootPino) {
      Logger.initializeRootLogger();
    }

    this.logger = Logger.rootPino.child({ context });
  }

  private static initializeRootLogger() {
    const config = Settings.getInstance().config;
    const isDev = config.NODE_ENV === "development";

    Logger.rootPino = pino({
      level: config.LOG_LEVEL,
      transport: isDev
        ? {
            target: "pino-pretty",
            options: {
              colorize: true,
              translateTime: "HH:MM:ss",
              ignore: "pid,hostname",
            },
          }
        : undefined,
      serializers: {
        err: pino.stdSerializers.err,
      },
    });
  }

  public info<T extends object = LogMeta>(msg: string, meta?: T): void {
    if (meta) {
      this.logger.info(meta as object, msg);
    } else {
      this.logger.info(msg);
    }
  }

  public warn<T extends object = LogMeta>(msg: string, meta?: T): void {
    if (meta) {
      this.logger.warn(meta as object, msg);
    } else {
      this.logger.warn(msg);
    }
  }

  public debug<T extends object = LogMeta>(msg: string, meta?: T): void {
    if (meta) {
      this.logger.debug(meta as object, msg);
    } else {
      this.logger.debug(msg);
    }
  }

  public error<T extends object = LogMeta>(
    msg: string,
    error?: unknown,
    meta?: T,
  ): void {
    const logObject: Record<string, unknown> = meta ? { ...meta } : {};

    if (error instanceof Error) {
      logObject.err = error;
    } else if (typeof error !== "undefined" && error !== null) {
      logObject.errorRaw = error;
    }

    if (Object.keys(logObject).length > 0) {
      this.logger.error(logObject as object, msg);
    } else {
      this.logger.error(msg);
    }
  }
}
