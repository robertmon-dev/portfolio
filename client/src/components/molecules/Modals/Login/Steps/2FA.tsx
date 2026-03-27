import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { Input } from "@/components/atoms/Input/Input";
import { Button } from "@/components/atoms/Button/Button";
import type { TwoFactorFormProps } from "../types";

export const TwoFactorForm = ({
  form: modalForm,
  isLoading,
}: TwoFactorFormProps) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ code: string }>({
    defaultValues: {
      code: modalForm.twoFactorCode,
    },
  });

  const onSubmit = (data: { code: string }) => {
    modalForm.handle2FASubmit(data.code);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
      <p className="auth-form__description">
        {t(
          "auth.2fa.description",
          "Enter the 6-digit verification code from your authenticator app to secure your session.",
        )}
      </p>

      <div className="auth-form__fields">
        <Input
          {...register("code", {
            required: t("auth.2fa.errors.required", "Code is required"),
            pattern: {
              value: /^[0-9]{6}$/,
              message: t("auth.2fa.errors.invalid", "Code must be 6 digits"),
            },
          })}
          label={t("auth.2fa.fields.code.label", "Verification Code")}
          type="text"
          inputMode="numeric"
          placeholder="000 000"
          error={errors.code?.message}
          leftIcon={<ShieldCheck size={18} />}
          fullWidth
          autoFocus
          disabled={isLoading}
        />
      </div>

      <div className="auth-form__footer">
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          fullWidth
          rightIcon={<ArrowRight size={18} />}
        >
          {t("auth.2fa.submit", "Verify & Login")}
        </Button>
      </div>
    </form>
  );
};
