import { instance } from "../init";
import { TRPCError } from "@trpc/server";
import { RateLimiter } from "../../core/limiter/rateLimiter";
import { RateLimitError } from "../../core/error/rateLimit";

export const rateLimitMiddleware = instance.middleware(
  async ({ ctx, next }) => {
    try {
      const limiter = RateLimiter.getInstance();
      const ip = ctx.ip as string;

      await limiter.checkLimit(ip);
      return next();
    } catch (error) {
      if (error instanceof RateLimitError) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "errors.codes.TOO_MANY_REQUESTS",
          cause: { retryAfter: Math.ceil(error.msBeforeNext / 1000) },
        });
      }

      throw error;
    }
  },
);
