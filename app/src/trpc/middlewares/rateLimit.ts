import { instance } from "../init";
import { TRPCError } from "@trpc/server";
import { RateLimiter } from "../../core/limiter/rateLimiter";
import { RateLimitError } from "../../core/error/rateLimit";
import type { RateLimitProfile } from "src/core/limiter/types";

export const createRateLimitMiddleware = (
  profile: RateLimitProfile = "default",
) =>
  instance.middleware(async ({ ctx, next }) => {
    try {
      const limiter = RateLimiter.getInstance();
      const ip = ctx.ip as string;

      await limiter.checkLimit(ip, profile);

      return next();
    } catch (error) {
      if (error instanceof RateLimitError) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "errors.codes.429",
          cause: { retryAfter: Math.ceil(error.msBeforeNext / 1000) },
        });
      }
      throw error;
    }
  });

export const rateLimitMiddleware = createRateLimitMiddleware("default");
export const strictRateLimitMiddleware = createRateLimitMiddleware("strict");
