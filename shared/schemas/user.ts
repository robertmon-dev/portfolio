import { z } from "zod";
import { RoleEnum, UserPermissionSchema } from "./permission";
import {
  zUuid,
  zEmail,
  zString,
  zText,
  zUrl,
  zPassword,
  zDatePreprocess,
  zSafeArray,
} from "./generic";

export const UserProfileSchema = z.object({
  id: zUuid,
  email: zEmail,
  username: zString,
  name: zString.nullable(),
  headline: zString.nullable(),
  bio: zText.nullable(),
  avatarUrl: zUrl.nullable(),
  socials: z.record(zString, z.any()).nullable(),
  role: RoleEnum,
  permissions: zSafeArray(UserPermissionSchema).default([]),
  createdAt: zDatePreprocess,
  updatedAt: zDatePreprocess,
  twoFactorEnabled: z.boolean().default(false),
});

export const MeResponseSchema = z.object({
  user: UserProfileSchema,
});

export const GetUserInputSchema = z
  .object({
    id: zUuid.optional(),
    email: zEmail.optional(),
    username: zString.optional(),
  })
  .refine((data) => data.id || data.email || data.username, {
    message: "Provide at least one identifier: id, email, or username",
  });

export const ListUsersInputSchema = z
  .object({
    role: RoleEnum.optional(),
    limit: z.number().min(1).max(100).default(20),
    offset: z.number().min(0).default(0),
    search: zString.optional(),
  })
  .optional();

export const UpdateUserInputSchema = z.object({
  id: zUuid,
  name: zString.min(2).nullable().optional(),
  headline: zString.nullable().optional(),
  bio: zText.nullable().optional(),
  avatarUrl: zUrl.nullable().optional(),
  socials: z.record(zString, z.any()).nullable().optional(),
  role: RoleEnum.optional(),
});

export const DeleteUserInputSchema = z.object({
  id: zUuid,
});

export const CreateUserInputSchema = z.object({
  email: zEmail,
  username: zString.min(3).max(30),
  password: zPassword,
  name: zString.min(2).optional(),
  role: RoleEnum.default("USER").optional(),
});

export const UserPublicSchema = z.object({
  id: zUuid,
  username: zString,
  name: zString.nullable(),
  headline: zString.nullable(),
  bio: zText.nullable(),
  avatarUrl: zUrl.nullable(),
  socials: z.record(z.string(), z.url()).nullable().default({}),
});
