import { Section, Text, Heading } from "@react-email/components";
import { Layout } from "./components/Layout";
import type { VerificationAlertProps } from "../types";

const translations = {
  en: {
    previewText: "Your verification code",
    heading: "Verification Code",
    body: "Use the following code to complete your sign-in process:",
    footer:
      "This code is valid for 10 minutes. Do not share this code with anyone.",
  },
  pl: {
    previewText: "Twój kod weryfikacyjny",
    heading: "Kod weryfikacyjny",
    body: "Użyj poniższego kodu, aby dokończyć proces logowania:",
    footer: "Kod jest ważny przez 10 minut. Nie udostępniaj go nikomu.",
  },
} as const;

export const TwoFactorEmail = ({
  code,
  locale = "en",
}: VerificationAlertProps) => {
  const t = translations[locale];

  return (
    <Layout previewText={t.previewText} locale={locale}>
      <Heading className="text-tn-yellow text-[22px] font-bold p-0 my-[20px] text-center">
        {t.heading}
      </Heading>
      <Text className="text-tn-lavender text-[15px] leading-[24px] text-center">
        {t.body}
      </Text>
      <Section className="bg-tn-bgNight/50 border border-dashed border-tn-yellow/50 rounded-lg p-[24px] my-[32px] text-center">
        <Text className="text-tn-yellow text-[32px] font-mono font-bold tracking-[10px] m-0">
          {code}
        </Text>
      </Section>
      <Text className="text-tn-slate text-[12px] text-center">{t.footer}</Text>
    </Layout>
  );
};
