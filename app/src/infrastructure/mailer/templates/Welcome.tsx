import { Section, Text, Button, Heading, Link } from "@react-email/components";
import { Layout } from "./components/Layout";
import type { WelcomeEmailProps } from "../types";

const translations = {
  en: {
    previewText: "Welcome aboard! Your account is ready.",
    heading: (name: string) => `Hey ${name}! ⚡`,
    body: "Thanks for joining! Your environment is all set up. There's just one last step — we need to verify your email address to make sure it's really you.",
    button: "Verify Account",
    fallback:
      "If the button above doesn't work, please copy and paste this link into your browser:",
    regards: "Best regards,",
  },
  pl: {
    previewText: "Witaj na pokładzie! Twoje konto jest gotowe.",
    heading: (name: string) => `Hej ${name}! ⚡`,
    body: "Dziękujemy za dołączenie! Twoje środowisko jest już skonfigurowane. Pozostał jeszcze jeden krok — musimy zweryfikować Twój adres e-mail.",
    button: "Zweryfikuj konto",
    fallback:
      "Jeśli przycisk powyżej nie działa, skopiuj i wklej ten link do przeglądarki:",
    regards: "Pozdrawiam,",
  },
} as const;

export const WelcomeEmail = ({
  name,
  url,
  locale = "en",
}: WelcomeEmailProps) => {
  const t = translations[locale];

  return (
    <Layout previewText={t.previewText} locale={locale}>
      <Heading className="text-tn-purple text-[22px] font-bold p-0 my-[20px]">
        {t.heading(name)}
      </Heading>
      <Text className="text-tn-lavender text-[15px] leading-[24px]">
        {t.body}
      </Text>
      <Section className="text-center mt-[32px] mb-[32px]">
        <Button
          className="bg-tn-blue rounded-md text-tn-bgNight text-[14px] font-bold no-underline text-center px-6 py-4 shadow-lg"
          href={url}
        >
          {t.button}
        </Button>
      </Section>
      <Text className="text-tn-slate text-[14px] leading-[24px]">
        {t.fallback}
        <br />
        <Link href={url} className="text-tn-blue break-all">
          {url}
        </Link>
      </Text>
      <Text className="text-tn-lavender text-[15px] mt-[32px]">
        {t.regards} <br />
        <strong>Robert Moń</strong>
      </Text>
    </Layout>
  );
};

export default WelcomeEmail;
