import { router } from "../../trpc/init";
import { publicProcedure } from "../../trpc/procedures/public";
import { AuthService } from "../../services/auth/AuthService";
import { PasswordResetService } from "../../services/reset/Password";
import {
  LoginInputSchema,
  Verify2FASchema,
  ResetPasswordSchema,
  RequestPasswordResetSchema,
  Resend2FASchema,
  LoginResponseSchema,
  MessageResponseSchema,
  SuccessResponseSchema,
} from "@portfolio/shared";
import { invokeAction } from "../../trpc/executers/action";

export const authRouter = router({
  login: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/auth/login",
        tags: ["Auth"],
        summary: "Initialize login",
        description:
          "Authenticates the user using email and password. If 2FA is enabled, it returns a 'processing' status and requires a secondary verification code.",
        protect: false,
      },
    })
    .input(LoginInputSchema)
    .output(LoginResponseSchema)
    .mutation(async ({ ctx, input }) =>
      invokeAction(AuthService, ctx, "login", input),
    ),

  verify2FA: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/auth/2fa/verify",
        tags: ["Auth"],
        summary: "Verify 2FA code",
        description:
          "Completes the login process by verifying a 6-digit code sent via email. Upon success, returns a JWT session token.",
        protect: false,
      },
    })
    .input(Verify2FASchema)
    .output(LoginResponseSchema)
    .mutation(async ({ ctx, input }) =>
      invokeAction(AuthService, ctx, "verify2FA", input),
    ),

  resend2FA: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/auth/2fa/resend",
        tags: ["Auth"],
        summary: "Resend 2FA code",
        description:
          "Generates and sends a new verification code if the previous one has expired or was not received. Includes a 60-second rate limit.",
        protect: false,
      },
    })
    .input(Resend2FASchema)
    .output(MessageResponseSchema)
    .mutation(async ({ ctx, input }) =>
      invokeAction(AuthService, ctx, "resend2FACode", input),
    ),

  requestPasswordReset: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/auth/password/request",
        tags: ["Auth"],
        summary: "Request password reset",
        description:
          "Initiates the password recovery procedure. If the account exists, a unique reset token is sent to the provided email address.",
        protect: false,
      },
    })
    .input(RequestPasswordResetSchema)
    .output(MessageResponseSchema)
    .mutation(async ({ ctx, input }) =>
      invokeAction(PasswordResetService, ctx, "requestReset", input),
    ),

  resetPassword: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/auth/password/reset",
        tags: ["Auth"],
        summary: "Finalize password reset",
        description:
          "Sets a new password for the user using a valid reset token. The token is invalidated immediately after a successful reset.",
        protect: false,
      },
    })
    .input(ResetPasswordSchema)
    .output(SuccessResponseSchema)
    .mutation(async ({ ctx, input }) =>
      invokeAction(PasswordResetService, ctx, "reset", input),
    ),
});
