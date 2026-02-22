import { LoginInput, LoginResponse } from '@portfolio/shared';

export interface Authenticating {
  login(input: LoginInput): Promise<LoginResponse>;
}
