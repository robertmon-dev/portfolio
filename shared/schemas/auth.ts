import { z } from 'zod';
import { UserProfileSchema } from './user';

export const LoginInputSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const LoginResponseSchema = z.discriminatedUnion('status', [
  z.object({
    status: z.literal('processing'),
    userId: z.string().uuid(),
    message: z.string(),
  }),
  z.object({
    status: z.literal('success'),
    token: z.string(),
    user: UserProfileSchema,
  }),
]);

