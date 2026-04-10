import { RateLimiterRedis, RateLimiterRes } from "rate-limiter-flexible";
import { RateLimitError } from "../error/rateLimit";
import { RedisClient } from "../redis/redis";
import { Logger } from "../logger/logger";
import { Limiting, RateLimitProfile } from "./types";

export class RateLimiter implements Limiting {
  private static instance: RateLimiter;
  private defaultLimiter: RateLimiterRedis;
  private strictLimiter: RateLimiterRedis;
  private logger: Logger;

  private constructor() {
    this.logger = new Logger("RateLimiter");
    const redisClient = RedisClient.getInstance().client;

    this.defaultLimiter = new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: "rl_default",
      points: 10,
      duration: 1,
    });

    this.strictLimiter = new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: "rl_strict",
      points: 3,
      duration: 60 * 30,
      blockDuration: 60 * 60,
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

  public async checkLimit(
    key: string,
    profile: RateLimitProfile = "default",
  ): Promise<void> {
    const limiter =
      profile === "strict" ? this.strictLimiter : this.defaultLimiter;

    try {
      await limiter.consume(key, 1);
    } catch (error: unknown) {
      if (this.isRateLimiterRes(error)) {
        this.logger.warn(
          `[${profile.toUpperCase()}] Rate limit exceeded for key: ${key}. Next attempt in: ${error.msBeforeNext}ms`,
        );

        throw new RateLimitError(error.msBeforeNext);
      }

      this.logger.error("Internal RateLimiter/Redis error", error);
      throw error;
    }
  }
}
