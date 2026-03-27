import type { LoginInput, ResetPasswordInput } from "@portfolio/shared";

export type LoginStep = "LOGIN" | "2FA" | "FORGOT_PASSWORD" | "RESET_PASSWORD";

export type LoginAction =
  | { type: "OPEN_MODAL" }
  | { type: "CLOSE_MODAL" }
  | { type: "SET_STEP"; payload: LoginStep }
  | { type: "UPDATE_FIELD"; payload: { field: keyof LoginState; value: any } }
  | { type: "SET_USER_ID"; payload: string | null }
  | { type: "RESET_FORM" };

export interface LoginState {
  isOpen: boolean;
  step: LoginStep;
  email: string;
  password: string;
  rememberMe: boolean;
  twoFactorCode: string;
  resetCode: string;
  newPassword: string;
  confirmPassword: string;
  userId: string | null;
}

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
  handleLoginSubmit: (data: LoginInput) => Promise<void>;
  handle2FASubmit: (code: string) => Promise<void>;
  handleRequestReset: (data: { email: string }) => Promise<void>;
  handleResetSubmit: (data: ResetPasswordInput) => Promise<void>;
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

export const initialState: LoginState = {
  isOpen: false,
  step: "LOGIN",
  email: "",
  password: "",
  rememberMe: false,
  twoFactorCode: "",
  resetCode: "",
  newPassword: "",
  confirmPassword: "",
  userId: null,
};

export const loginReducer = (
  state: LoginState,
  action: LoginAction,
): LoginState => {
  switch (action.type) {
    case "OPEN_MODAL":
      return { ...state, isOpen: true };
    case "CLOSE_MODAL":
      return { ...state, isOpen: false };
    case "SET_STEP":
      return { ...state, step: action.payload };
    case "UPDATE_FIELD":
      return { ...state, [action.payload.field]: action.payload.value };
    case "SET_USER_ID":
      return { ...state, userId: action.payload };
    case "RESET_FORM":
      return { ...initialState };
    default:
      return state;
  }
};
