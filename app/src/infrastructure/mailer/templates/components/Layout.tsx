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

export const Layout = ({ children, previewText }: LayoutProps) => {
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
        <Body className="bg-tn-bgNight my-auto mx-auto font-sans text-tn-lavender">
          <Container className="bg-tn-bgStorm border border-solid border-tn-slate/40 rounded-lg my-[40px] mx-auto p-[32px] w-[465px] shadow-2xl">
            <Section className="mb-[32px]">
              <Text className="text-tn-blue text-[24px] font-bold p-0 m-0 tracking-tight">
                Robert <span className="text-tn-purple">Moń</span>
              </Text>
            </Section>

            {children}

            <Section className="mt-[48px] border-t border-solid border-tn-slate/30 pt-[24px]">
              <Text className="text-tn-slate text-[12px] leading-[20px]">
                This message was automatically generated. If you were not
                expecting this email, you can safely ignore it.
              </Text>
              <Link
                href="https://github.com/robertmon-dev"
                className="text-tn-blue text-[12px] font-medium no-underline mt-2 inline-block"
              >
                View GitHub Profile →
              </Link>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
