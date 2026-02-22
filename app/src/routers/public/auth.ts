import { router } from '../../trpc/init';
import { publicProcedure } from '../../trpc/procedures/public';
import { AuthService } from '../../services/auth/AuthService';
import { PasswordResetService } from 'src/services/reset/Password';
import {
  LoginInputSchema,
  Verify2FASchema,
  ResetPasswordSchema,
  RequestPasswordResetSchema,
  Resend2FASchema
} from '@portfolio/shared';

export const authRouter = router({
  login: publicProcedure
    .input(LoginInputSchema)
    .mutation(async ({ ctx, input }) => {
      const authService = new AuthService(ctx.db, ctx.cache, ctx.logger, ctx.settings);
      return authService.login(input);
    }),

  verify2FA: publicProcedure
    .input(Verify2FASchema)
    .mutation(async ({ ctx, input }) => {
      const authService = new AuthService(ctx.db, ctx.cache, ctx.logger, ctx.settings);
      return authService.verify2FA(input);
    }),

  resend2FA: publicProcedure
    .input(Resend2FASchema)
    .mutation(async ({ ctx, input }) => {
      const authService = new AuthService(ctx.db, ctx.cache, ctx.logger, ctx.settings);
      return authService.resend2FACode(input);
    }),

  requestPasswordReset: publicProcedure
    .input(RequestPasswordResetSchema)
    .mutation(async ({ ctx, input }) => {
      const service = new PasswordResetService(ctx.db, ctx.cache, ctx.logger, ctx.settings);
      return service.requestReset(input);
    }),

  resendPasswordReset: publicProcedure
    .input(RequestPasswordResetSchema)
    .mutation(async ({ ctx, input }) => {
      const service = new PasswordResetService(ctx.db, ctx.cache, ctx.logger, ctx.settings);
      return service.resendReset(input);
    }),

  resetPassword: publicProcedure
    .input(ResetPasswordSchema)
    .mutation(async ({ ctx, input }) => {
      const service = new PasswordResetService(ctx.db, ctx.cache, ctx.logger, ctx.settings);
      return service.reset(input);
    }),
});
