import { Section, Text, Button, Heading, Link } from '@react-email/components';
import { Layout } from './components/Layout';
import type { WelcomeEmailProps } from './types';


export const WelcomeEmail = ({ name, url }: WelcomeEmailProps) => {
  return (
    <Layout previewText="Welcome aboard! Your account is ready.">
      <Heading className="text-tn-purple text-[22px] font-bold p-0 my-[20px]">
        Hey {name}! ⚡
      </Heading>

      <Text className="text-tn-lavender text-[15px] leading-[24px]">
        Thanks for joining! Your environment is all set up.
        There's just one last step — we need to verify your email address to make sure it's really you.
      </Text>

      <Section className="text-center mt-[32px] mb-[32px]">
        <Button
          className="bg-tn-blue rounded-md text-tn-bgNight text-[14px] font-bold no-underline text-center px-6 py-4 shadow-lg"
          href={url}
        >
          Verify Account
        </Button>
      </Section>

      <Text className="text-tn-slate text-[14px] leading-[24px]">
        If the button above doesn't work, please copy and paste this link into your browser:
        <br />
        <Link href={url} className="text-tn-blue break-all">
          {url}
        </Link>
      </Text>

      <Text className="text-tn-lavender text-[15px] mt-[32px]">
        Best regards, <br />
        <strong>Robert Moń</strong>
      </Text>
    </Layout>
  );
};

export default WelcomeEmail;
