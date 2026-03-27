import { TRPCError } from "@trpc/server";
import { Settings } from "../../core/settings/settings";
import { middleware } from "../init";

export const tokenChecker = middleware(async ({ ctx, next }) => {
  const apiToken = ctx.req.headers["x-api-token"];
  if (!apiToken) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Missing x-api-token header",
    });
  }

  const settings = Settings.getInstance().config;

  if (settings.X_API_TOKEN !== apiToken) {
    throw new TRPCError({ code: "FORBIDDEN", message: "Invalid API token" });
  }

  return next();
});
