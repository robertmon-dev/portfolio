import { z } from 'zod';

export const RoleEnum = z.enum(['USER', 'ADMIN', 'MODERATOR', 'VIEWER']);

export const UserProfileSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  username: z.string(),
  name: z.string().nullable(),
  headline: z.string().nullable(),
  bio: z.string().nullable(),
  avatarUrl: z.string().nullable(),
  socials: z.record(z.any()).nullable(),
  role: RoleEnum,
  permissions: z.array(z.string()).default([]),
  createdAt: z.date(),
  updatedAt: z.date(),
  twoFactorEnabled: z.boolean().default(false).optional(),
});

export const MeResponseSchema = z.object({
  user: UserProfileSchema
});
