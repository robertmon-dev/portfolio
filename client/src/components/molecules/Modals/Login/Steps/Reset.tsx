import { useTranslation } from "react-i18next";
import { Lock, Hash } from "lucide-react";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import type { LoginFormProps } from "../types";

export const ResetPasswordForm = ({ form, isLoading }: LoginFormProps) => {
  const { t } = useTranslation();

  const isMismatch =
    form.newPassword !== form.confirmPassword && form.confirmPassword !== "";

  return (
    <form
      onSubmit={form.handleResetSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
    >
      <Input
        label={t("auth.recover.code.label", "Reset Code")}
        type="text"
        value={form.resetCode}
        onChange={(e) => form.setResetCode(e.target.value)}
        placeholder="123456"
        leftIcon={<Hash size={18} />}
        fullWidth
        required
        disabled={isLoading}
      />

      <Input
        label={t("auth.recover.newPassword.label", "New Password")}
        type="password"
        value={form.newPassword}
        onChange={(e) => form.setNewPassword(e.target.value)}
        placeholder="••••••••"
        leftIcon={<Lock size={18} />}
        fullWidth
        required
        disabled={isLoading}
      />

      <Input
        label={t("auth.recover.confirmPassword.label", "Confirm New Password")}
        type="password"
        value={form.confirmPassword}
        onChange={(e) => form.setConfirmPassword(e.target.value)}
        placeholder="••••••••"
        leftIcon={<Lock size={18} />}
        fullWidth
        required
        disabled={isLoading}
        error={
          isMismatch
            ? t("auth.recover.mismatch", "Passwords do not match")
            : undefined
        }
      />

      <Button
        type="submit"
        variant="primary"
        isLoading={isLoading}
        disabled={isMismatch}
        fullWidth
      >
        {t("auth.recover.submit", "Update Password")}
      </Button>
    </form>
  );
};
