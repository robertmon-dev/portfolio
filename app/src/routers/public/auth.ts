import { router } from '../../trpc/init';
import { publicProcedure } from '../../trpc/procedures/public';
import { AuthService } from '../../services/auth/AuthService';
import { PasswordResetService } from '../../services/reset/Password';
import {
  LoginInputSchema,
  Verify2FASchema,
  ResetPasswordSchema,
  RequestPasswordResetSchema,
  Resend2FASchema
} from '@portfolio/shared';
import { invokeAction } from '../../trpc/executers/action';

export const authRouter = router({
  login: publicProcedure
    .input(LoginInputSchema)
    .mutation(async ({ ctx, input }) =>
      invokeAction(AuthService, ctx, 'login', input)
    ),

  verify2FA: publicProcedure
    .input(Verify2FASchema)
    .mutation(async ({ ctx, input }) =>
      invokeAction(AuthService, ctx, 'verify2FA', input)
    ),

  resend2FA: publicProcedure
    .input(Resend2FASchema)
    .mutation(async ({ ctx, input }) =>
      invokeAction(AuthService, ctx, 'resend2FACode', input)
    ),

  requestPasswordReset: publicProcedure
    .input(RequestPasswordResetSchema)
    .mutation(async ({ ctx, input }) =>
      invokeAction(PasswordResetService, ctx, 'requestReset', input)
    ),

  resendPasswordReset: publicProcedure
    .input(RequestPasswordResetSchema)
    .mutation(async ({ ctx, input }) =>
      invokeAction(PasswordResetService, ctx, 'resendReset', input)
    ),

  resetPassword: publicProcedure
    .input(ResetPasswordSchema)
    .mutation(async ({ ctx, input }) =>
      invokeAction(PasswordResetService, ctx, 'reset', input)
    ),
});
