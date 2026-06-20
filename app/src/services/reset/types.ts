import {
  RequestPasswordResetInput,
  ResetPasswordInput,
} from "@portfolio/shared";

export interface PasswordResetting {
  requestReset(input: RequestPasswordResetInput): Promise<{ message: string }>;
  reset(input: ResetPasswordInput): Promise<{ success: true }>;
}

export enum Actions {
  Request,
  Reset,
  Resend,
}

export type PasswordResetServiceInput =
  | { ops: Actions.Request; input: RequestPasswordResetInput }
  | { ops: Actions.Resend; input: RequestPasswordResetInput }
  | { ops: Actions.Reset; input: ResetPasswordInput };

export type PasswordResetServiceOutput =
  | { message: string }
  | { success: true };
