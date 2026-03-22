import { z } from "zod";
import { UserProfileSchema } from "./user";

export const LoginInputSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const LoginResponseSchema = z.union([
  z.object({
    status: z.literal("success"),
    token: z.string(),
    user: UserProfileSchema,
  }),
  z.object({
    status: z.literal("processing"),
    userId: z.uuid(),
    message: z.string(),
  }),
]);

export const Verify2FASchema = z.object({
  userId: z.uuid(),
  code: z.string().length(6),
});

export const RequestPasswordResetSchema = z.object({
  email: z.email("Invalid email format"),
});

export const ResetPasswordSchema = z
  .object({
    token: z.string().min(1, "Token is required"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const Resend2FASchema = z.object({
  userId: z.uuid(),
});

export const MessageResponseSchema = z.object({
  message: z.string(),
});

export const SuccessResponseSchema = z.object({
  success: z.literal(true),
});
