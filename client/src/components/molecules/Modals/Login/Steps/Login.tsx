import { useTranslation } from "react-i18next";
import { Mail, Lock } from "lucide-react";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { Checkbox } from "@/components/atoms/CheckBox/CheckBox";
import type { LoginFormProps } from "../types";
import "../LoginModal.scss"

export const LoginForm = ({ form, isLoading }: LoginFormProps) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={form.handleLoginSubmit} className="login-form-step">
      <Input
        label={t("auth.login.email.label", "Email Address")}
        type="email"
        value={form.email}
        onChange={(e) => form.setEmail(e.target.value)}
        placeholder={t("auth.login.email.placeholder", "your@email.com")}
        leftIcon={<Mail size={18} />}
        fullWidth
        required
        disabled={isLoading}
      />

      <Input
        label={t("auth.login.password.label", "Password")}
        type="password"
        value={form.password}
        onChange={(e) => form.setPassword(e.target.value)}
        placeholder={t("auth.login.password.placeholder", "••••••••")}
        leftIcon={<Lock size={18} />}
        fullWidth
        required
        disabled={isLoading}
      />

      <div className="login-form-step__options">
        <Checkbox
          label={t("auth.login.remember", "Remember me")}
          checked={form.rememberMe}
          onChange={(e) => form.setRememberMe(e.target.checked)}
          disabled={isLoading}
        />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => form.goToStep('FORGOT_PASSWORD')}
          disabled={isLoading}
          className="login-form-step__forgot-btn"
        >
          {t("auth.login.forgot_link", "Forgotten Password?")}
        </Button>
      </div>

      <Button type="submit" variant="primary" isLoading={isLoading} fullWidth>
        {t("auth.login.submit", "Sign In")}
      </Button>
    </form>
  );
};
