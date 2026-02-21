import { useTranslation } from "react-i18next";
import { Button } from "@/components/atoms/Button/Button";
import { Card } from "@/components/atoms/Card/Card";
import { Tag } from "@/components/atoms/Tag/Tag";
import { DemoSection } from "@/components/molecules/Sections/Demo/DemoSection";
import { EntityGrid } from "@/components/molecules/EntityGrid/EntityGrid";
import { MoreVertical } from "lucide-react";

export interface DemoGridItem {
  id: string | number;
  name: string;
  users: number;
  status: "Aktywna" | "Wstrzymana" | string;
}

interface GridSectionProps {
  demoGridData: DemoGridItem[]
  isGridLoading: boolean;
  handleSimulateLoading: () => void;
  handleOpenMenu: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const GridSection = ({
  demoGridData,
  isGridLoading,
  handleSimulateLoading,
  handleOpenMenu,
}: GridSectionProps) => {
  const { t } = useTranslation();

  return (
    <DemoSection
      title={t("demo.sections.grid.title", "4. Siatka Danych")}
      action={
        <Button variant="outline" size="sm" onClick={handleSimulateLoading}>
          {t("demo.grid.simulateLoading", "Symuluj Ładowanie")}
        </Button>
      }
    >
      <EntityGrid
        data={demoGridData}
        columns={{ default: 1, md: 2, lg: 3 }}
        gap="1rem"
        isLoading={isGridLoading}
        renderItem={(item) => (
          <Card
            interactive
            variant="transparent"
            padding="md"
            className="demo-grid-card"
          >
            <div className="demo-grid-card__header">
              <h3 className="demo-grid-card__title">{item.name}</h3>
              <Button variant="ghost" isIcon size="sm" onClick={handleOpenMenu}>
                <MoreVertical size={16} />
              </Button>
            </div>
            <p className="demo-grid-card__text">
              {t("demo.grid.usersCount", "Użytkownicy:")} {item.users}
            </p>
            <div className="demo-grid-card__footer">
              <Tag
                variant={item.status === "Aktywna" ? "success" : "warning"}
                size="sm"
              >
                {item.status}
              </Tag>
            </div>
          </Card>
        )}
      />
    </DemoSection>
  );
};
