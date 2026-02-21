import { useTranslation } from "react-i18next";
import { TextDisplay } from "@/components/atoms/TextDisplay/TextDisplay";
import { CodeBlock } from "@/components/atoms/CodeBlock/CodeBlock";
import { Card } from "@/components/atoms/Card/Card";
import { DemoSection } from "@/components/molecules/Sections/Demo/DemoSection";
import { Github } from "lucide-react";

export const CodeSection = ({ sampleCode }: { sampleCode: string }) => {
  const { t } = useTranslation();

  return (
    <DemoSection
      title={t("demo.sections.code.title", "6. Code & Data Display")}
      columns={2}
    >
      <Card variant="flat" className="demo-card--code">
        <div className="demo-code-header">
          <Github size={16} /> <span>Snippet.ts</span>
        </div>
        <pre className="demo-code-wrapper">
          <CodeBlock code={sampleCode} />
        </pre>
      </Card>
      <Card variant="elevated">
        <TextDisplay
          label={t("demo.codeDisplay.tokenLabel", "Token")}
          copyable
          state="info"
        >
          TOKEN_NJ92_X21_TOKYO
        </TextDisplay>
      </Card>
    </DemoSection>
  );
};
