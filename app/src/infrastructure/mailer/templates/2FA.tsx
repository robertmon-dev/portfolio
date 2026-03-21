import { Section, Text, Heading } from "@react-email/components";
import { Layout } from "./components/Layout";

export const TwoFactorEmail = ({ code }: { code: string }) => (
  <Layout previewText="Your verification code">
    <Heading className="text-tn-yellow text-[22px] font-bold p-0 my-[20px] text-center">
      Verification Code
    </Heading>
    <Text className="text-tn-lavender text-[15px] leading-[24px] text-center">
      Use the following code to complete your sign-in process:
    </Text>
    <Section className="bg-tn-bgNight/50 border border-dashed border-tn-yellow/50 rounded-lg p-[24px] my-[32px] text-center">
      <Text className="text-tn-yellow text-[32px] font-mono font-bold tracking-[10px] m-0">
        {code}
      </Text>
    </Section>
    <Text className="text-tn-slate text-[12px] text-center">
      This code is valid for 10 minutes. Do not share this code with anyone.
    </Text>
  </Layout>
);
