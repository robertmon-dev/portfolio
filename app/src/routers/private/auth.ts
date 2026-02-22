import { TRPCError } from '@trpc/server';
import { router } from '../../trpc/init';
import { protectedProcedure } from '../../trpc/procedures/private';
import { AuthService } from '../../services/auth/AuthService';
import { Authenticator } from '../../trpc/auth/authenticator';
import { UserProfileSchema, type UserProfile } from '@portfolio/shared';

export const authPrivateRouter = router({
  me: protectedProcedure
    .query(async ({ ctx }): Promise<UserProfile> => {
      const user = await ctx.db.user.findUnique({
        where: { id: ctx.user.id }
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found'
        });
      }

      return UserProfileSchema.parse(user)
    }),

  logout: protectedProcedure
    .mutation(async ({ ctx }) => {
      const authHeader = ctx.req.headers.authorization;
      const authenticator = Authenticator.getInstance();

      const token = authenticator.extractToken(authHeader);

      if (!token) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Malformed or missing authorization header'
        });
      }

      const authService = new AuthService(ctx.db, ctx.cache, ctx.logger, ctx.settings);
      return authService.logout(token);
    }),
});
