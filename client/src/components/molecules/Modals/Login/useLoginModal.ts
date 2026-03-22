import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import { useRecover } from "@/hooks/useRecover";
import type { LoginStep } from "./types";

export const useLoginModal = (onSuccess?: () => void) => {
  const { t } = useTranslation();
  const { login, confirm2FA, isLoggingIn } = useAuth();
  const { requestReset, confirmReset, isRecovering } = useRecover();

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<LoginStep>("LOGIN");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  const close = () => {
    setIsOpen(false);
    setTimeout(() => {
      setStep("LOGIN");
      setUserId(null);
      setEmail("");
      setPassword("");
      setTwoFactorCode("");
      setResetCode("");
      setNewPassword("");
      setConfirmPassword("");
    }, 300);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login({ email, password });

      if (result?.status === "processing") {
        setUserId(result.userId);
        setStep("2FA");
        toast.info(t("auth.login.2fa_required", "Please enter your 2FA code"));
      } else if (result?.status === "success") {
        toast.success(t("auth.login.success", "Welcome back!"));
        onSuccess?.();
        close();
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : t("errors.login_failed"),
      );
    }
  };

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await requestReset({ email });
      toast.info(
        t(
          "auth.recover.email_sent",
          "If the account exists, a code has been sent",
        ),
      );
      setStep("RESET_PASSWORD");
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : t("errors.unexpected", "Action failed"),
      );
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error(t("auth.recover.mismatch", "Passwords do not match"));
      return;
    }

    try {
      await confirmReset({
        token: resetCode,
        password: newPassword,
        confirmPassword,
      });
      toast.success(t("auth.recover.success", "Password updated successfully"));
      setStep("LOGIN");
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : t("errors.reset_failed", "Invalid reset code"),
      );
    }
  };

  const handle2FASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    try {
      const result = await confirm2FA({ userId, code: twoFactorCode });

      if (result?.status === "success") {
        toast.success(t("auth.login.success", "Welcome back!"));
        onSuccess?.();
        close();
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t("errors.2fa_invalid"));
    }
  };

  return {
    isOpen,
    step,
    open: () => setIsOpen(true),
    close,
    isLoggingIn: isLoggingIn || isRecovering,
    form: {
      email,
      setEmail,
      password,
      setPassword,
      rememberMe,
      setRememberMe,
      twoFactorCode,
      setTwoFactorCode,
      resetCode,
      setResetCode,
      newPassword,
      setNewPassword,
      confirmPassword,
      setConfirmPassword,
      handleLoginSubmit,
      handle2FASubmit,
      handleRequestReset,
      handleResetSubmit,
      goToStep: (s: LoginStep) => setStep(s),
    },
  };
};
