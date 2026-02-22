import { Section, Text, Button, Heading } from '@react-email/components';
import { Layout } from './components/Layout';

export const ResetPasswordEmail = ({ name, url }: { name: string; url: string }) => (
  <Layout previewText="Reset your password">
    <Heading className="text-tn-red text-[22px] font-bold p-0 my-[20px]">
      Password Reset Request 🔐
    </Heading>
    <Text className="text-tn-lavender text-[15px] leading-[24px]">
      Hi {name}, we received a request to reset your password. If you didn't make this request, you can safely ignore this email.
    </Text>
    <Section className="text-center mt-[32px] mb-[32px]">
      <Button
        className="bg-tn-red rounded-md text-tn-bgNight text-[14px] font-bold no-underline text-center px-6 py-4 shadow-lg"
        href={url}
      >
        Reset Password
      </Button>
    </Section>
    <Text className="text-tn-slate text-[12px]">
      This link will expire in 1 hour for security reasons.
    </Text>
  </Layout>
);
