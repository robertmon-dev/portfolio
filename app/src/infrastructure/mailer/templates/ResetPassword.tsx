import { Section, Text, Heading } from "@react-email/components";
import { Layout } from "./components/Layout";

export const ResetPasswordEmail = ({
  name,
  code,
  expiration,
}: {
  name: string;
  code: string;
  expiration: number;
}) => (
  <Layout previewText="Reset your password">
    <Heading className="text-tn-red text-[22px] font-bold p-0 my-[20px]">
      Password Reset Request 🔐
    </Heading>
    <Text className="text-tn-lavender text-[15px] leading-[24px]">
      Hi {name}, we received a request to reset your password. If you didn't
      make this request, you can safely ignore this email.
    </Text>
    <Section className="bg-tn-bgNight/50 border border-dashed border-tn-yellow/50 rounded-lg p-[24px] my-[32px] text-center">
      <Text className="text-tn-yellow text-[32px] font-mono font-bold tracking-[10px] m-0">
        {code}
      </Text>
    </Section>
    <Text className="text-tn-slate text-[12px]">
      This link will expire in ${expiration} minutes for security reasons.
    </Text>
  </Layout>
);
