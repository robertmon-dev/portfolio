import { z } from "zod";
import { zEmail, zLocale, zPassword, zString, zUuid } from "./generic";
import { UserProfileSchema } from "./user";

export const LoginInputSchema = z.object({
  email: zEmail,
  password: zPassword,
  locale: zLocale,
});

export const LoginResponseSchema = z.union([
  z.object({
    status: z.literal("success"),
    token: zString,
    user: UserProfileSchema,
  }),
  z.object({
    status: z.literal("processing"),
    userId: zUuid,
    message: zString,
  }),
]);

export const Verify2FASchema = z.object({
  userId: zUuid,
  code: zString.length(6),
});

export const RequestPasswordResetSchema = z.object({
  email: zEmail,
  locale: zLocale,
});

export const ResetPasswordSchema = z
  .object({
    token: zString.min(1, "auth.errors.tokenRequired"),
    password: zPassword,
    confirmPassword: zString,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "auth.errors.passwordsMismatch",
    path: ["confirmPassword"],
  });

export const Resend2FASchema = z.object({
  userId: zUuid,
  locale: zLocale,
});

export const MessageResponseSchema = z.object({
  message: zString,
});

export const SuccessResponseSchema = z.object({
  success: z.literal(true),
});
