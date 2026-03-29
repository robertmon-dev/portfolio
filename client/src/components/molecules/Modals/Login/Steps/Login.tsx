import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { Mail, Lock, LogIn } from "lucide-react";
import { Input } from "@/components/atoms/Input/Input";
import { Button } from "@/components/atoms/Button/Button";
import { Checkbox } from "@/components/atoms/CheckBox/CheckBox";
import { LoginInputSchema, type LoginInput } from "@portfolio/shared";
import type { LoginFormProps } from "../types";

export const LoginForm = ({ form: modalForm, isLoading }: LoginFormProps) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginInputSchema),
    defaultValues: {
      email: modalForm.email,
      password: "",
    },
  });

  const onSubmit = (data: LoginInput) => {
    modalForm.setEmail(data.email);
    modalForm.handleLoginSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
      <div className="auth-form__fields">
        <Input
          {...register("email")}
          label={t("auth.login.fields.email.label", "Email Address")}
          placeholder="admin@portfolio.com"
          error={errors.email?.message}
          leftIcon={<Mail size={18} />}
          fullWidth
          disabled={isLoading}
        />

        <Input
          {...register("password")}
          type="password"
          label={t("auth.login.fields.password.label", "Password")}
          placeholder="••••••••"
          error={errors.password?.message}
          leftIcon={<Lock size={18} />}
          fullWidth
          disabled={isLoading}
        />
      </div>

      <div className="auth-form__options">
        <Checkbox
          label={t("auth.login.remember_me", "Remember me")}
          onChange={(e) => modalForm.setRememberMe(e.target.checked)}
          checked={modalForm.rememberMe}
        />
        <button
          type="button"
          className="auth-form__forgot-link"
          onClick={() => modalForm.goToStep("FORGOT_PASSWORD")}
        >
          {t("auth.login.forgotPassword", "Forgot password?")}
        </button>
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        isLoading={isLoading}
        leftIcon={<LogIn size={18} />}
      >
        {t("auth.login.submit", "Sign In")}
      </Button>
    </form>
  );
};
