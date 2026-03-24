import { useReducer, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import { useRecover } from "@/hooks/useRecover";
import { notifyError } from "@/lib/trpc/handlers/trpcError";
import { LoginInputSchema, ResetPasswordSchema } from "@portfolio/shared";
import { loginReducer, initialState } from "./types";
import type { LoginStep, LoginFormState } from "./types";

export const useLoginModal = (onSuccess?: () => void) => {
  const { t } = useTranslation();
  const { login, confirm2FA, isLoggingIn } = useAuth();
  const { requestReset, confirmReset, isRecovering } = useRecover();
  const [state, dispatch] = useReducer(loginReducer, initialState);

  const updateField = (field: keyof typeof initialState, value: any) =>
    dispatch({ type: "UPDATE_FIELD", payload: { field, value } });

  const close = useCallback(() => {
    dispatch({ type: "CLOSE_MODAL" });
    setTimeout(() => dispatch({ type: "RESET_FORM" }), 300);
  }, []);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = LoginInputSchema.safeParse({
      email: state.email,
      password: state.password,
    });

    if (!validation.success) {
      return toast.error(validation.error.issues[0].message);
    }

    try {
      const result = await login(validation.data);
      if (result?.status === "processing") {
        dispatch({ type: "SET_USER_ID", payload: result.userId });
        dispatch({ type: "SET_STEP", payload: "2FA" });
        toast.info(t("auth.login.2fa_required"));
      } else if (result?.status === "success") {
        toast.success(t("auth.login.success"));
        onSuccess?.();
        close();
      }
    } catch (err) {
      notifyError(err);
    }
  };

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.email.includes("@"))
      return toast.error(t("errors.invalid_email"));

    try {
      await requestReset({ email: state.email });
      toast.success(t("auth.recover.email_sent"));
      dispatch({ type: "SET_STEP", payload: "RESET_PASSWORD" });
    } catch (err) {
      notifyError(err);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = ResetPasswordSchema.safeParse({
      token: state.resetCode,
      password: state.newPassword,
      confirmPassword: state.confirmPassword,
    });

    if (!validation.success) {
      return toast.error(validation.error.issues[0].message);
    }

    try {
      await confirmReset(validation.data);
      toast.success(t("auth.recover.success"));
      dispatch({ type: "SET_STEP", payload: "LOGIN" });
    } catch (err) {
      notifyError(err);
    }
  };

  const handle2FASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.userId) return;

    try {
      const result = await confirm2FA({
        userId: state.userId,
        code: state.twoFactorCode,
      });
      if (result?.status === "success") {
        toast.success(t("auth.login.success"));
        onSuccess?.();
        close();
      }
    } catch (err) {
      notifyError(err);
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
