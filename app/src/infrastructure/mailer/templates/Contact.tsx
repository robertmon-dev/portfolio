import { Text, Heading, Section, Hr } from "@react-email/components";
import { Layout } from "./components/Layout";
import { tokyoNight as tn } from "./theme";

const translations = {
  en: {
    previewText: "Message received — I'll get back to you soon.",
    eyebrow: "message received",
    heading: (name: string) => `Hey, ${name}.`,
    body: "Your message arrived safely. I'll get back to you as soon as possible — usually within one or two business days.",
    cardLabel: "your message",
    status: "● delivered",
  },
  pl: {
    previewText: "Wiadomość odebrana — odezwę się wkrótce.",
    eyebrow: "wiadomość odebrana",
    heading: (name: string) => `Cześć, ${name}.`,
    body: "Twoja wiadomość dotarła do mnie bezpiecznie. Odezwę się najszybciej, jak tylko to możliwe — zazwyczaj w ciągu jednego–dwóch dni roboczych.",
    cardLabel: "twoja wiadomość",
    status: "● dostarczona",
  },
} as const;

export const ContactConfirmationEmail = ({
  name,
  message,
  locale = "en",
}: {
  name: string;
  message: string;
  locale?: "en" | "pl";
}) => {
  const t = translations[locale];
  const preview =
    message.length > 120 ? message.substring(0, 120) + "..." : message;

  return (
    <Layout previewText={t.previewText} locale={locale}>
      <Section
        style={{
          background: `linear-gradient(90deg, ${tn.green} 0%, ${tn.purple} 50%, ${tn.blue} 100%)`,
          height: "3px",
          borderRadius: "2px",
          marginBottom: "32px",
        }}
      />

      <Text
        style={{
          fontFamily: "'DM Mono', 'Courier New', monospace",
          fontSize: "10px",
          letterSpacing: "0.22em",
          textTransform: "uppercase" as const,
          color: tn.green,
          margin: "0 0 12px 0",
        }}
      >
        {t.eyebrow}
      </Text>

      <Heading
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "32px",
          fontWeight: 700,
          color: tn.lavender,
          lineHeight: 1.2,
          margin: "0 0 12px 0",
          letterSpacing: "-0.4px",
        }}
      >
        {t.heading(name)}
      </Heading>

      <Text
        style={{
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: "15px",
          color: tn.slate,
          lineHeight: "25px",
          margin: "0 0 32px 0",
        }}
      >
        {t.body}
      </Text>

      <Section
        style={{
          backgroundColor: tn.bgNight,
          border: `1px solid ${tn.slate}40`,
          borderLeft: `3px solid ${tn.purple}`,
          borderRadius: "6px",
          padding: "18px 22px",
          margin: "0 0 32px 0",
        }}
      >
        <Text
          style={{
            fontFamily: "'DM Mono', 'Courier New', monospace",
            fontSize: "9px",
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            color: tn.purple,
            margin: "0 0 10px 0",
          }}
        >
          {t.cardLabel}
        </Text>
        <Text
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "14px",
            fontStyle: "italic",
            color: tn.lavender,
            lineHeight: "22px",
            margin: 0,
            opacity: 0.85,
          }}
        >
          "{preview}"
        </Text>
      </Section>

      <Hr style={{ borderColor: `${tn.slate}30`, margin: "0 0 24px 0" }} />

      <Section style={{ margin: "0 0 8px 0" }}>
        <Text
          style={{
            fontFamily: "'DM Mono', 'Courier New', monospace",
            fontSize: "11px",
            color: tn.slate,
            margin: 0,
            display: "inline",
          }}
        >
          status:{" "}
        </Text>
        <Text
          style={{
            fontFamily: "'DM Mono', 'Courier New', monospace",
            fontSize: "11px",
            color: tn.green,
            margin: 0,
            display: "inline",
          }}
        >
          {t.status}
        </Text>
      </Section>

      <Section
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${tn.blue}55 50%, transparent 100%)`,
          height: "1px",
          marginTop: "28px",
        }}
      />
    </Layout>
  );
};
