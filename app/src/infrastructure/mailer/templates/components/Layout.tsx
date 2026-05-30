import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
  Preview,
  Tailwind,
} from "@react-email/components";
import { tokyoNight } from "../theme";
import type { LayoutProps } from "./types";

const translations = {
  en: {
    footer:
      "This message was automatically generated. If you were not expecting this email, you can safely ignore it.",
    github: "View GitHub Profile →",
  },
  pl: {
    footer:
      "Ta wiadomość została wygenerowana automatycznie. Jeśli jej nie oczekiwałeś/aś, możesz ją spokojnie zignorować.",
    github: "Profil GitHub →",
  },
} as const;

export const Layout = ({
  children,
  previewText,
  locale = "en",
}: LayoutProps) => {
  const t = translations[locale];

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                tn: tokyoNight,
              },
            },
          },
        }}
      >
        <Body
          className="bg-tn-bgNight font-sans text-tn-lavender"
          style={{
            margin: 0,
            padding: 0,
            width: "100%",
            textAlign: "center" as const,
          }}
        >
          <Container
            className="bg-tn-bgStorm border border-solid border-tn-slate/40 rounded-lg shadow-2xl"
            style={{
              margin: "40px auto",
              padding: "32px",
              width: "465px",
              maxWidth: "100%",
              textAlign: "left" as const,
            }}
          >
            <Section className="mb-[32px]">
              <Text className="text-tn-blue text-[24px] font-bold p-0 m-0 tracking-tight">
                Robert <span className="text-tn-purple">Moń</span>
              </Text>
            </Section>

            {children}

            <Section className="mt-[48px] border-t border-solid border-tn-slate/30 pt-[24px]">
              <Text className="text-tn-slate text-[12px] leading-[20px]">
                {t.footer}
              </Text>
              <Link
                href="https://github.com/robertmon-dev"
                className="text-tn-blue text-[12px] font-medium no-underline mt-2 inline-block"
              >
                {t.github}
              </Link>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
