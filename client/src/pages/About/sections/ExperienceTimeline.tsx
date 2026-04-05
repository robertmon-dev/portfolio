import { useTranslation } from "react-i18next";
import { TimelineGrid } from "@/components/molecules/Timeline/Timeline";
import { Card } from "@/components/atoms/Card/Card";
import { Badge } from "@/components/atoms/Badge/Badge";
import { format } from "date-fns";
import type { ExperienceTimelineProps } from "../types";
import "./ExperienceTimeline.scss";

export const ExperienceTimeline = ({ items }: ExperienceTimelineProps) => {
  const { t } = useTranslation();

  if (!items || items.length === 0) return null;

  const timelineItems = items.map((item) => ({
    id: item.id,
    content: (
      <Card
        variant="levitating-transparent"
        interactive
        padding="lg"
        className="experience-card"
      >
        <div className="experience-card__header">
          <div className="experience-card__title-group">
            <h3 className="experience-card__position">{item.position}</h3>
            <span className="experience-card__company">{item.company}</span>
          </div>

          <Badge variant="warning" size="md" className="experience-card__date">
            {format(new Date(item.startDate), "MMM yyyy")} —{" "}
            {item.isCurrent
              ? t("common.present", "Present")
              : item.endDate
                ? format(new Date(item.endDate), "MMM yyyy")
                : ""}
          </Badge>
        </div>

        <p className="experience-card__description">{item.description}</p>
      </Card>
    ),
    oppositeContent: item.notes,
    gapToNext: "20vh",
  }));

  return (
    <div className="experience-timeline">
      <TimelineGrid items={timelineItems} />
    </div>
  );
};
