import { TRPCError } from "@trpc/server";
import { Settings } from "../../core/settings/settings";
import { middleware } from "../init";
import crypto from "crypto";

export const tokenCheckerMiddleware = middleware(async ({ ctx, next }) => {
  const rawToken = ctx.req.headers["x-api-token"];
  const apiToken = Array.isArray(rawToken) ? rawToken[0] : rawToken;

  if (!apiToken) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Missing x-api-token header",
    });
  }

  const settings = Settings.getInstance().config;
  const secretToken = settings.X_API_TOKEN;

  if (!secretToken) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "API token not configured on server",
    });
  }

  const apiTokenBuffer = Buffer.from(apiToken);
  const secretTokenBuffer = Buffer.from(secretToken);

  const isMatch =
    apiTokenBuffer.length === secretTokenBuffer.length &&
    crypto.timingSafeEqual(apiTokenBuffer, secretTokenBuffer);

  if (!isMatch) {
    throw new TRPCError({ code: "FORBIDDEN", message: "Invalid API token" });
  }

  return next();
});
