import { useReducer, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import { useRecover } from "@/hooks/useRecover";
import { type LoginInput, type ResetPasswordInput } from "@portfolio/shared";
import { loginReducer, initialState } from "./types";
import type {
  LoginStep,
  LoginFormState,
  LoginState,
  LoginFormField,
  UpdateFieldAction,
} from "./types";

export const useLoginModal = (onSuccess?: () => void) => {
  const { t } = useTranslation();
  const { login, confirm2FA, isLoggingIn } = useAuth();
  const { requestReset, confirmReset, isRecovering } = useRecover();
  const [state, dispatch] = useReducer(loginReducer, initialState);

  const makeUpdateFieldAction = <K extends LoginFormField>(
    field: K,
    value: LoginState[K],
  ): UpdateFieldAction => ({
    type: "UPDATE_FIELD",
    payload: { field, value },
  });

  const updateField = <K extends LoginFormField>(
    field: K,
    value: LoginState[K],
  ) => dispatch(makeUpdateFieldAction(field, value));

  const close = useCallback(() => {
    dispatch({ type: "CLOSE_MODAL" });
    setTimeout(() => dispatch({ type: "RESET_FORM" }), 300);
  }, []);

  const handleLoginSubmit = async (data: LoginInput) => {
    const result = await login(data);
    if (result?.status === "processing") {
      dispatch({ type: "SET_USER_ID", payload: result.userId });
      dispatch({ type: "SET_STEP", payload: "2FA" });
      toast.info(
        t("auth.login.2faRequired", "Two-factor authentication required"),
      );
    } else if (result?.status === "success") {
      toast.success(t("auth.login.success", "Logged in successfully"));
      onSuccess?.();
      close();
    }
  };

  const handleRequestReset = async (data: { email: string }) => {
    await requestReset(data);
    toast.success(t("auth.recover.emailSent", "Reset code sent to your email"));
    dispatch({ type: "SET_STEP", payload: "RESET_PASSWORD" });
  };

  const handleResetSubmit = async (data: ResetPasswordInput) => {
    await confirmReset(data);
    toast.success(t("auth.recover.success", "Password has been updated"));
    dispatch({ type: "SET_STEP", payload: "LOGIN" });
  };

  const handle2FASubmit = async (code: string) => {
    if (!state.userId) return;

    const result = await confirm2FA({
      userId: state.userId,
      code,
    });

    if (result?.status === "success") {
      toast.success(t("auth.login.success", "Access granted!"));
      onSuccess?.();
      close();
    }
  };

  return {
    isOpen: state.isOpen,
    step: state.step,
    open: () => dispatch({ type: "OPEN_MODAL" }),
    close,
    isLoggingIn: isLoggingIn || isRecovering,
    form: {
      ...state,
      setEmail: (v: string) => updateField("email", v),
      setPassword: (v: string) => updateField("password", v),
      setRememberMe: (v: boolean) => updateField("rememberMe", v),
      setTwoFactorCode: (v: string) => updateField("twoFactorCode", v),
      setResetCode: (v: string) => updateField("resetCode", v),
      setNewPassword: (v: string) => updateField("newPassword", v),
      setConfirmPassword: (v: string) => updateField("confirmPassword", v),

      handleLoginSubmit,
      handle2FASubmit,
      handleRequestReset,
      handleResetSubmit,

      goToStep: (s: LoginStep) => dispatch({ type: "SET_STEP", payload: s }),
    } as LoginFormState,
  };
};
