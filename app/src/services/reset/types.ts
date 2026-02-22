import { RequestPasswordResetInput, ResetPasswordInput } from '@portfolio/shared';

export interface PasswordResetting {
  requestReset(input: RequestPasswordResetInput): Promise<{ message: string }>;
  reset(input: ResetPasswordInput): Promise<{ success: true }>;
}
