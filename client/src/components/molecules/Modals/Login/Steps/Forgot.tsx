import { useTranslation } from "react-i18next";
import { Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import type { LoginFormProps } from "../types";

export const ForgotPasswordForm = ({ form, isLoading }: LoginFormProps) => {
  const { t } = useTranslation();

  return (
    <form
      onSubmit={form.handleRequestReset}
      style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
    >
      <p
        style={{
          fontSize: "0.875rem",
          color: "var(--text-muted)",
          textAlign: "center",
        }}
      >
        {t(
          "auth.recover.forgot_description",
          "Enter your email address and we will send you a code to reset your password.",
        )}
      </p>

      <Input
        label={t("auth.login.email.label", "Email Address")}
        type="email"
        value={form.email}
        onChange={(e) => form.setEmail(e.target.value)}
        placeholder="your@email.com"
        leftIcon={<Mail size={18} />}
        fullWidth
        required
        disabled={isLoading}
      />

      <Button type="submit" variant="primary" isLoading={isLoading} fullWidth>
        {t("auth.recover.send_code", "Send Reset Code")}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => form.goToStep("LOGIN")}
        disabled={isLoading}
        fullWidth
      >
        <ArrowLeft size={14} style={{ marginRight: "8px" }} />
        {t("common.back", "Back to Login")}
      </Button>
    </form>
  );
};
