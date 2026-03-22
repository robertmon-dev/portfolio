import type { FormEvent } from "react";

export type LoginStep = "LOGIN" | "2FA" | "FORGOT_PASSWORD" | "RESET_PASSWORD";

export interface LoginFormState {
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  rememberMe: boolean;
  setRememberMe: (v: boolean) => void;
  twoFactorCode: string;
  setTwoFactorCode: (v: string) => void;
  resetCode: string;
  setResetCode: (v: string) => void;
  newPassword: string;
  setNewPassword: (v: string) => void;
  confirmPassword: string;
  setConfirmPassword: (v: string) => void;
  handleLoginSubmit: (e: FormEvent) => Promise<void>;
  handle2FASubmit: (e: FormEvent) => Promise<void>;
  handleRequestReset: (e: FormEvent) => Promise<void>;
  handleResetSubmit: (e: FormEvent) => Promise<void>;
  goToStep: (step: LoginStep) => void;
}

export interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  isLoading: boolean;
  step: LoginStep;
  form: LoginFormState;
}

export interface LoginFormProps {
  form: LoginFormState;
  isLoading: boolean;
}

export interface TwoFactorFormProps {
  form: LoginFormState;
  isLoading: boolean;
}
