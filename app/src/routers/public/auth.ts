import { router } from '../../trpc/init';
import { publicProcedure } from '../../trpc/procedures/public';
import { AuthService } from '../../services/auth/AuthService';
import { LoginInputSchema } from '@portfolio/shared';

export const authRouter = router({
  login: publicProcedure
    .input(LoginInputSchema)
    .mutation(async ({ ctx, input }) => {
      const authService = new AuthService(ctx.db, ctx.cache, ctx.logger, ctx.settings);
      return authService.login(input);
    }),
});
