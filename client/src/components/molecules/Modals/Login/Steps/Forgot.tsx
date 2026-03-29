import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Mail, ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import type { LoginFormProps } from "../types";

export const ForgotPasswordForm = ({
  form: modalForm,
  isLoading,
}: LoginFormProps) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({
    defaultValues: {
      email: modalForm.email,
    },
  });

  const onSubmit = (data: { email: string }) => {
    modalForm.handleRequestReset(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
      <p className="auth-form__description">
        {t(
          "auth.recover.forgotDescription",
          "Lost your password? Enter your email address and we will send you a secure code to reset it.",
        )}
      </p>

      <div className="auth-form__fields">
        <Input
          {...register("email", {
            required: t("auth.login.errors.emailRequired", "Email is required"),
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: t(
                "auth.login.errors.emailInvalid",
                "Invalid email address",
              ),
            },
          })}
          label={t("auth.login.fields.email.label", "Email Address")}
          type="email"
          placeholder="your@email.com"
          error={errors.email?.message}
          leftIcon={<Mail size={18} />}
          fullWidth
          disabled={isLoading}
        />
      </div>

      <div className="auth-form__footer">
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          fullWidth
          leftIcon={<Send size={18} />}
        >
          {t("auth.recover.send_code", "Send Reset Code")}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => modalForm.goToStep("LOGIN")}
          disabled={isLoading}
          fullWidth
          leftIcon={<ArrowLeft size={16} />}
          className="auth-form__back-button"
        >
          {t("common.back", "Back to Login")}
        </Button>
      </div>
    </form>
  );
};
