import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { router } from "../../trpc/init";
import { protectedProcedure } from "../../trpc/procedures/private";
import { AuthService } from "../../services/auth/AuthService";
import { Authenticator } from "../../trpc/auth/authenticator";
import { GetUserService } from "src/services/user/Get";
import { UserProfileSchema } from "@portfolio/shared";
import { executeService } from "src/trpc/executers/base";

export const authPrivateRouter = router({
  me: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/admin/auth/me",
        tags: ["Auth"],
        summary: "Get current user profile",
        description:
          "Returns the profile information of the currently authenticated user.",
        protect: true,
      },
    })
    .input(z.void())
    .output(UserProfileSchema)
    .query(({ ctx }) => {
      return executeService(GetUserService, ctx, { id: ctx.user.id });
    }),

  logout: protectedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/admin/auth/logout",
        tags: ["Auth"],
        summary: "Logout user",
        description: "Invalidates the current session token.",
        protect: true,
      },
    })
    .input(z.void())
    .output(z.object({ success: z.boolean() }))
    .mutation(async ({ ctx }) => {
      const authHeader = ctx.req.headers.authorization;
      const authenticator = Authenticator.getInstance();
      const token = authenticator.extractToken(authHeader);

      if (!token) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Malformed or missing authorization header",
        });
      }

      const authService = new AuthService(
        ctx.db,
        ctx.cache,
        ctx.logger,
        ctx.settings,
        ctx,
      );

      await authService.logout(token);
      return { success: true };
    }),
});
