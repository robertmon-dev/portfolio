import { Section, Text, Heading, Hr, Link } from "@react-email/components";
import { Layout } from "./components/Layout";
import type { AdminContactAlertProps } from "../types";

export const AdminContactAlertEmail = ({
  senderName,
  senderEmail,
  subject,
  message,
  ip,
}: AdminContactAlertProps) => (
  <Layout previewText={`New message from ${senderName}: ${subject}`}>
    <Heading className="text-tn-orange text-[20px] font-bold p-0 my-[20px]">
      New Portfolio Message 📬
    </Heading>

    <Section className="bg-tn-bgNight/50 border border-solid border-tn-slate/20 rounded-md p-[16px] mb-[24px]">
      <Text className="text-tn-lavender m-0 mb-[8px] text-[14px]">
        <strong className="text-tn-blue">From:</strong> {senderName} (
        {senderEmail})
      </Text>
      <Text className="text-tn-lavender m-0 text-[14px]">
        <strong className="text-tn-blue">Subject:</strong> {subject}
      </Text>
    </Section>

    <Section className="mb-[24px]">
      <Text className="text-tn-slate text-[12px] uppercase tracking-wider font-bold mb-[8px]">
        Message content:
      </Text>
      <Text className="text-tn-lavender text-[15px] leading-[24px] bg-tn-bgNight/30 p-[16px] rounded-md border-l-2 border-tn-purple border-solid">
        {message}
      </Text>
    </Section>

    <Hr className="border-tn-slate/20 my-[24px]" />

    <Section>
      <Text className="text-tn-slate text-[11px] font-mono">
        Sender Metadata:
        <br />
        IP Address: <span className="text-tn-green">{ip}</span>
      </Text>
      <Link
        href={`mailto:${senderEmail}`}
        className="bg-tn-blue rounded-md text-tn-bgNight text-[13px] font-bold no-underline text-center px-5 py-3 mt-[16px] inline-block"
      >
        Reply Directly
      </Link>
    </Section>
  </Layout>
);
