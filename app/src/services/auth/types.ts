import {
  LoginInput,
  LoginResponse,
  Resend2FAInput,
  VerifyTwoFactorInput,
} from "@portfolio/shared";

export interface Authenticating {
  login(input: LoginInput): Promise<LoginResponse>;
}

export enum Operanda {
  Login,
  SecondFactor,
  Resend,
  Logout,
}

export interface LogoutInput {
  token: string;
}

export type AuthServiceInput =
  | { ops: Operanda.Login; input: LoginInput }
  | { ops: Operanda.Resend; input: Resend2FAInput }
  | { ops: Operanda.SecondFactor; input: VerifyTwoFactorInput }
  | { ops: Operanda.Logout; input: LogoutInput };

export type AuthServiceOutput =
  | Promise<LoginResponse>
  | { message: string }
  | { success: true };
