import { useTranslation } from "react-i18next";
import { Card } from "@/components/atoms/Card/Card";
import { List } from "@/components/molecules/List/List";
import { DemoSection } from "@/components/molecules/Sections/Demo/DemoSection";
import type { ListOption } from "@/components/molecules/List/List";

export const ListsSection = ({
  demoListItems,
}: {
  demoListItems: ListOption[];
}) => {
  const { t } = useTranslation();

  return (
    <DemoSection title={t("demo.sections.lists.title", "3. Listy")} columns={2}>
      <Card variant="elevated">
        <h3 className="demo-list-title">
          {t("demo.lists.defaultColumn", "Domyślna w kolumnie")}
        </h3>
        <List items={demoListItems} direction="column" />
      </Card>
      <Card variant="elevated">
        <h3 className="demo-list-title">
          {t("demo.lists.horizontalNav", "Wariant poziomy (nav)")}
        </h3>
        <List items={demoListItems} variant="nav" direction="row" />
      </Card>
    </DemoSection>
  );
};
