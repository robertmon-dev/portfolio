import {
  RequestPasswordResetInput,
  ResetPasswordInput,
} from "@portfolio/shared";

export interface PasswordResetting {
  requestReset(input: RequestPasswordResetInput): Promise<{ message: string }>;
  reset(input: ResetPasswordInput): Promise<{ success: true }>;
}

export enum Operands {
  Request,
  Reset,
  Resend,
}

export type PasswordResetServiceInput =
  | { ops: Operands.Request; input: RequestPasswordResetInput }
  | { ops: Operands.Resend; input: RequestPasswordResetInput }
  | { ops: Operands.Reset; input: ResetPasswordInput };

export type PasswordResetServiceOutput =
  | { message: string }
  | { success: true };
