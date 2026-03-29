import { LoginForm } from "./Steps/Login";
import { TwoFactorForm } from "./Steps/2FA";
import { ForgotPasswordForm } from "./Steps/Forgot";
import { ResetPasswordForm } from "./Steps/Reset";
import type { LoginFormState, LoginStep } from "./types";

export const STEP_COMPONENTS: Record<
  LoginStep,
  React.ComponentType<{ form: LoginFormState; isLoading: boolean }>
> = {
  LOGIN: LoginForm,
  "2FA": TwoFactorForm,
  FORGOT_PASSWORD: ForgotPasswordForm,
  RESET_PASSWORD: ResetPasswordForm,
};

export const getStepTitleKey = (step: LoginStep): string => {
  const titleKeys: Record<LoginStep, string> = {
    LOGIN: "auth.login.title",
    "2FA": "auth.2fa.title",
    FORGOT_PASSWORD: "auth.recover.forgot_title",
    RESET_PASSWORD: "auth.recover.reset_title",
  };
  return titleKeys[step];
};

export const STEP_TITLE_FALLBACKS: Record<LoginStep, string> = {
  LOGIN: "Login",
  "2FA": "Two-Factor Auth",
  FORGOT_PASSWORD: "Reset Password",
  RESET_PASSWORD: "Set New Password",
};
