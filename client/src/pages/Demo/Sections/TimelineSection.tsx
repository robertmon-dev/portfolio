import { useTranslation } from "react-i18next";
import { Card } from "@/components/atoms/Card/Card";
import { Tag } from "@/components/atoms/Tag/Tag";
import { DemoSection } from "@/components/molecules/Sections/Demo/DemoSection";
import { TimelineGrid } from "@/components/molecules/Timeline/Timeline";
import type { TimelineItem } from "@/components/molecules/Timeline/types";
import type { TimelineSectionProps } from "../types";


export const TimelineSection = ({ timelineData }: TimelineSectionProps) => {
  const { t } = useTranslation();

  const timelineItems: TimelineItem[] = timelineData.map((item) => ({
    id: item.id,
    gapToNext: item.gapToNext,
    content: (
      <Card variant={item.cardVariant} padding="md" style={{ opacity: item.opacity }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
          <h3 style={{ margin: 0, color: item.titleColor }}>
            {t(item.titleKey, item.titleDefault)}
          </h3>
          <Tag variant={item.tagVariant} size="sm">
            {t(item.tagKey, item.tagDefault)}
          </Tag>
        </div>
        <p className="text-muted" style={{ margin: 0, fontSize: "0.85rem" }}>
          {t(item.descKey, item.descDefault)}
        </p>
      </Card>
    ),
  }));

  return (
    <DemoSection title={t("demo.sections.timeline.title", "9. Oś Czasu (Timeline)")}>
      <TimelineGrid items={timelineItems} gap="10rem" />
    </DemoSection>
  );
};
