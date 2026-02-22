import { z } from 'zod';
import * as a from '../schemas/auth'

export type LoginResponse = z.infer<typeof a.LoginResponseSchema>;
export type LoginInput = z.infer<typeof a.LoginInputSchema>;
export type VerifyTwoFactorInput = z.infer<typeof a.Verify2FASchema>;
export type RequestPasswordResetInput = z.infer<typeof a.RequestPasswordResetSchema>;
export type ResetPasswordInput = z.infer<typeof a.ResetPasswordSchema>;
export type Resend2FAInput = z.infer<typeof a.Resend2FASchema>;
