import { RateLimiterRedis, RateLimiterRes } from "rate-limiter-flexible";
import { RateLimitError } from "../error/rateLimit";
import { RedisClient } from "../redis/redis";
import { Logger } from "../logger/logger";
import { Limiting } from "./types";

export class RateLimiter implements Limiting {
  private static instance: RateLimiter;
  private limiter: RateLimiterRedis;
  private logger: Logger;

  private constructor() {
    this.logger = new Logger("RateLimiter");
    const redisClient = RedisClient.getInstance().client;

    this.limiter = new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: "rlflx",
      points: 10,
      duration: 1,
      blockDuration: 60 * 15,
    });
  }

  public static getInstance(): RateLimiter {
    if (!RateLimiter.instance) {
      RateLimiter.instance = new RateLimiter();
    }
    return RateLimiter.instance;
  }

  private isRateLimiterRes(error: unknown): error is RateLimiterRes {
    return (
      !!error &&
      typeof error === "object" &&
      "msBeforeNext" in error &&
      typeof (error as { msBeforeNext?: unknown }).msBeforeNext === "number"
    );
  }

  public async checkLimit(key: string): Promise<void> {
    try {
      await this.limiter.consume(key, 1);
    } catch (error: unknown) {
      if (this.isRateLimiterRes(error)) {
        this.logger.warn(
          `Rate limit exceeded for key: ${key}. Next attempt in: ${error.msBeforeNext}ms`,
        );

        throw new RateLimitError(error.msBeforeNext);
      }

      this.logger.error("Internal RateLimiter/Redis error", error);
      throw error;
    }
  }
}
