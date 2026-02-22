import { z } from 'zod';
import * as t from '../schemas/user';


export type UserProfile = z.infer<typeof t.UserProfileSchema>;

