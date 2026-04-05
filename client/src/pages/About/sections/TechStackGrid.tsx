import { EntityGrid } from "@/components/molecules/EntityGrid/EntityGrid";
import { Card } from "@/components/atoms/Card/Card";
import { Badge } from "@/components/atoms/Badge/Badge";
import { TechIcon } from "@/components/atoms/Icon/Icon";
import { CATEGORY_VARIANT_MAP } from "./consts";
import type { TechStackGridProps } from "../types";
import "./TechStackGrid.scss";

export const TechStackGrid = ({ items, isLoading }: TechStackGridProps) => {
  return (
    <EntityGrid
      data={items}
      isLoading={isLoading}
      columns={{ default: 2, md: 3, lg: 4 }}
      gap="1.5rem"
      renderItem={(tech) => (
        <Card
          variant="transparent"
          interactive
          padding="md"
          style={
            {
              "--tech-color": tech.color ?? "var(--primary)",
            } as React.CSSProperties
          }
        >
          <div className="tech-card__content">
            <div className="tech-card__info">
              <span className="tech-card__name">{tech.name}</span>
              <Badge variant={CATEGORY_VARIANT_MAP[tech.category]} size="sm">
                {tech.category}
              </Badge>
            </div>

            <div className="tech-card__icon-wrapper">
              <TechIcon name={tech.name} color={tech.color ?? undefined} />
            </div>
          </div>
        </Card>
      )}
    />
  );
};
