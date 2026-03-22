import { z } from "zod";
import { RoleEnum, UserPermissionSchema } from "./permission";

export const dateSchema = z.preprocess((arg) => {
  if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
  return arg;
}, z.date());

export const UserProfileSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  username: z.string(),
  name: z.string().nullable(),
  headline: z.string().nullable(),
  bio: z.string().nullable(),
  avatarUrl: z.string().nullable(),
  socials: z.record(z.string(), z.any()).nullable(),
  role: RoleEnum,
  permissions: z.array(UserPermissionSchema).default([]),
  createdAt: dateSchema,
  updatedAt: dateSchema,
  twoFactorEnabled: z.boolean().default(false),
});

export const MeResponseSchema = z.object({
  user: UserProfileSchema,
});

export const GetUserInputSchema = z
  .object({
    id: z.string().optional(),
    email: z.string().optional(),
    username: z.string().optional(),
  })
  .refine((data) => data.id || data.email || data.username, {
    message: "Provide at least one identifier: id, email, or username",
  });

export const ListUsersInputSchema = z
  .object({
    role: RoleEnum.optional(),
    limit: z.number().min(1).max(100).default(20),
    offset: z.number().min(0).default(0),
    search: z.string().optional(),
  })
  .optional();

export const UpdateUserInputSchema = z.object({
  id: z.uuid(),
  name: z.string().min(2).max(50).nullable().optional(),
  headline: z.string().max(100).nullable().optional(),
  bio: z.string().max(2000).nullable().optional(),
  avatarUrl: z.url().nullable().optional(),
  socials: z.record(z.string(), z.any()).nullable().optional(),
  role: RoleEnum.optional(),
});

export const DeleteUserInputSchema = z.object({
  id: z.uuid(),
});

export const CreateUserInputSchema = z.object({
  email: z.email(),
  username: z.string().min(3).max(30),
  password: z.string().min(8),
  name: z.string().min(2).optional(),
  role: RoleEnum.default("USER").optional(),
});
