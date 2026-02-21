import { useTranslation } from "react-i18next";
import { Tag } from "@/components/atoms/Tag/Tag";
import { Card } from "@/components/atoms/Card/Card";
import { DemoSection } from "@/components/molecules/Sections/Demo/DemoSection";
import { DemoRow } from "@/components/molecules/Rows/Demo/DemoRow";
import { ShieldCheck, Terminal } from "lucide-react";

export const TagsSection = () => {
  const { t } = useTranslation();

  return (
    <DemoSection
      title={t(
        "demo.sections.tags.title",
        "2. Tagi (Warianty, Rozmiary, Opcje)",
      )}
    >
      <Card variant="flat" padding="md" className="demo-forms-card">
        <DemoRow>
          <Tag variant="default">
            {t("demo.tags.variants.default", "Default")}
          </Tag>
          <Tag variant="primary">
            {t("demo.tags.variants.primary", "Primary")}
          </Tag>
          <Tag variant="success">
            {t("demo.tags.variants.success", "Success")}
          </Tag>
          <Tag variant="info">{t("demo.tags.variants.info", "Info")}</Tag>
          <Tag variant="warning">
            {t("demo.tags.variants.warning", "Warning")}
          </Tag>
          <Tag variant="danger">{t("demo.tags.variants.danger", "Danger")}</Tag>
        </DemoRow>

        <DemoRow>
          <Tag variant="primary" size="sm">
            {t("demo.tags.sizes.small", "Small Tag")}
          </Tag>
          <Tag variant="primary" size="md">
            {t("demo.tags.sizes.medium", "Medium Tag")}
          </Tag>
          <Tag variant="primary" size="lg">
            {t("demo.tags.sizes.large", "Large Tag")}
          </Tag>
        </DemoRow>

        <DemoRow>
          <Tag variant="info" icon={<ShieldCheck size={14} />}>
            {t("demo.tags.options.withIcon", "Z ikoną")}
          </Tag>
          <Tag variant="warning" clickable onClick={() => console.log("Klik!")}>
            {t("demo.tags.options.clickable", "Kliknij mnie")}
          </Tag>
          <Tag variant="success" onDismiss={() => console.log("Usuń!")}>
            {t("demo.tags.options.dismissible", "Usuwalny")}
          </Tag>
          <div
            style={{
              width: "1px",
              height: "24px",
              background: "var(--border-color)",
              margin: "0 8px",
            }}
          />
          <Tag
            variant="danger"
            size="md"
            icon={<Terminal size={14} />}
            onDismiss={() => {}}
          >
            {t("demo.tags.options.full", "Full Wypas")}
          </Tag>
        </DemoRow>
      </Card>
    </DemoSection>
  );
};
