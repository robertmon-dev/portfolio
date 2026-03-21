import { protectedProcedure } from "./private";
import { TRPCError } from "@trpc/server";
import { Role } from "@prisma/client";

export const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  if (ctx.permissions.getRole() !== Role.ADMIN) {
    ctx.logger.warn(
      `Forbidden: User ${ctx.user.id} attempted to access admin procedure`,
      {
        currentRole: ctx.permissions.getRole(),
      },
    );

    throw new TRPCError({
      code: "FORBIDDEN",
      message: "This action requires administrative privileges",
    });
  }

  return next({
    ctx: {
      ...ctx,
    },
  });
});
