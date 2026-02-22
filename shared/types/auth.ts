import { z } from 'zod';
import * as t from '../schemas/auth'

export type LoginResponse = z.infer<typeof t.LoginResponseSchema>;
export type LoginInput = z.infer<typeof t.LoginInputSchema>;

