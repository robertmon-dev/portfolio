import { z } from "zod";
import { zEmail, zPassword, zString, zUuid } from "./generic";
import { UserProfileSchema } from "./user";

export const LoginInputSchema = z.object({
  email: zEmail,
  password: zPassword,
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
});

export const ResetPasswordSchema = z
  .object({
    token: zString.min(1, "Token is required"),
    password: zPassword,
    confirmPassword: zString,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const Resend2FASchema = z.object({
  userId: zUuid,
});

export const MessageResponseSchema = z.object({
  message: zString,
});

export const SuccessResponseSchema = z.object({
  success: z.literal(true),
});
