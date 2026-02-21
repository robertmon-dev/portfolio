import { useTranslation } from "react-i18next";
import { Card } from "@/components/atoms/Card/Card";
import { DemoSection } from "@/components/molecules/Sections/Demo/DemoSection";
import { Cpu } from "lucide-react";

export const ModalsSection = ({
  setIsModalOpen,
}: {
  setIsModalOpen: (val: boolean) => void;
}) => {
  const { t } = useTranslation();

  return (
    <DemoSection title={t("demo.sections.modals.title", "8. Modale")}>
      <Card
        variant="levitating"
        interactive
        onClick={() => setIsModalOpen(true)}
        padding="lg"
      >
        <div className="demo-modal-trigger">
          <Cpu size={40} className="demo-modal-trigger__icon" />
          <div className="demo-modal-trigger__content">
            <strong className="demo-modal-trigger__title">
              {t("demo.modals.triggerTitle", "Otwórz Modal Konfiguracyjny")}
            </strong>
            <p className="demo-modal-trigger__text">
              {t("demo.modals.triggerDesc", "Testowanie animacji i portali")}
            </p>
          </div>
        </div>
      </Card>
    </DemoSection>
  );
};
