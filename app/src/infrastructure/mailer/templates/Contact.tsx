import { Text, Heading, Section } from '@react-email/components';
import { Layout } from './components/Layout';

export const ContactConfirmationEmail = ({ name, message }: { name: string; message: string }) => (
  <Layout previewText="Message received!">
    <Heading className="text-tn-green text-[22px] font-bold p-0 my-[20px]">
      Message Received! 📥
    </Heading>
    <Text className="text-tn-lavender text-[15px] leading-[24px]">
      Hi {name}, thanks for reaching out! I've received your message and I'll get back to you as soon as possible.
    </Text>
    <Section className="bg-tn-bgNight/30 rounded p-[16px] my-[24px]">
      <Text className="text-tn-slate text-[13px] italic m-0">
        "{(message.length > 100 ? message.substring(0, 100) + '...' : message)}"
      </Text>
    </Section>
  </Layout>
);
