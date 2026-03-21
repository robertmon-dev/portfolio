import { protectedProcedure } from "./private";
import { TRPCError } from "@trpc/server";
import { Flag } from "@portfolio/shared";

export const permissionProcedure = (endpoint: string, flag: Flag) =>
  protectedProcedure.use(async ({ ctx, next }) => {
    const hasAccess = ctx.permissions.can(endpoint, flag);

    if (!hasAccess) {
      ctx.logger.warn(
        `Access Denied: User lacks ${flag} flag for ${endpoint}`,
        {
          userId: ctx.user.id,
          role: ctx.permissions.getRole(),
        },
      );

      throw new TRPCError({
        code: "FORBIDDEN",
        message: `Missing ${flag} permission for resource: ${endpoint}`,
      });
    }

    return next({ ctx });
  });
