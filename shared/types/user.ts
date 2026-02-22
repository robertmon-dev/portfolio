import { z } from 'zod';
import * as u from '../schemas/user';

export type UserProfile = z.infer<typeof u.UserProfileSchema>;
export type MeResponse = z.infer<typeof u.MeResponseSchema>;
export type Role = z.infer<typeof u.RoleEnum>
