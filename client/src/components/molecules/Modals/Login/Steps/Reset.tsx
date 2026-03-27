import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { Lock, Hash, RefreshCcw } from "lucide-react";
import { Input } from "@/components/atoms/Input/Input";
import { Button } from "@/components/atoms/Button/Button";
import {
  ResetPasswordSchema,
  type ResetPasswordInput,
} from "@portfolio/shared";
import type { LoginFormProps } from "../types";

export const ResetPasswordForm = ({
  form: modalForm,
  isLoading,
}: LoginFormProps) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      token: modalForm.resetCode,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: ResetPasswordInput) => {
    modalForm.handleResetSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
      <div className="auth-form__fields">
        <Input
          {...register("token")}
          label={t("auth.recover.fields.code.label", "Reset Code")}
          placeholder="123456"
          error={errors.token?.message}
          leftIcon={<Hash size={18} />}
          fullWidth
          required
          disabled={isLoading}
        />

        <Input
          {...register("password")}
          type="password"
          label={t("auth.recover.fields.password.label", "New Password")}
          placeholder="••••••••"
          error={errors.password?.message}
          leftIcon={<Lock size={18} />}
          fullWidth
          required
          disabled={isLoading}
        />

        <Input
          {...register("confirmPassword")}
          type="password"
          label={t(
            "auth.recover.fields.confirmPassword.label",
            "Confirm New Password",
          )}
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
          leftIcon={<Lock size={18} />}
          fullWidth
          required
          disabled={isLoading}
        />
      </div>

      <div className="auth-form__footer">
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          leftIcon={<RefreshCcw size={18} />}
          fullWidth
        >
          {t("auth.recover.submit", "Update Password")}
        </Button>
      </div>
    </form>
  );
};
