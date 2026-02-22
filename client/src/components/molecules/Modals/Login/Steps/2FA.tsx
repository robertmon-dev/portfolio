import { useTranslation } from "react-i18next";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import type { TwoFactorFormProps } from "../types";

export const TwoFactorForm = ({ form, isLoading }: TwoFactorFormProps) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={form.handle2FASubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textAlign: 'center' }}>
        {t("auth.2fa.description", "Enter the code from your authenticator app.")}
      </p>

      <Input
        label={t("auth.2fa.code.label", "Verification Code")}
        type="text"
        inputMode="numeric"
        value={form.twoFactorCode}
        onChange={(e) => form.setTwoFactorCode(e.target.value)}
        placeholder="000 000"
        leftIcon={<ShieldCheck size={18} />}
        fullWidth
        required
        autoFocus
        disabled={isLoading}
      />

      <Button type="submit" variant="primary" isLoading={isLoading} fullWidth>
        {t("auth.2fa.submit", "Verify & Login")}
      </Button>
    </form>
  );
};

