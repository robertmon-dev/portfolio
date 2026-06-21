import {
  LoginInput,
  LoginResponse,
  Resend2FAInput,
  VerifyTwoFactorInput,
} from "@portfolio/shared";

export interface Authenticating {
  login(input: LoginInput): Promise<LoginResponse>;
}

export enum Actions {
  Login,
  SecondFactor,
  Resend,
  Logout,
}

export interface LogoutInput {
  token: string;
}

export type AuthServiceInput =
  | { ops: Actions.Login; input: LoginInput }
  | { ops: Actions.Resend; input: Resend2FAInput }
  | { ops: Actions.SecondFactor; input: VerifyTwoFactorInput }
  | { ops: Actions.Logout; input: LogoutInput };

export type AuthServiceOutput =
  | Promise<LoginResponse>
  | { message: string }
  | { success: true };
