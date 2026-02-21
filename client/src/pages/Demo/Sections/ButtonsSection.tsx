import { useTranslation } from "react-i18next";
import { Button } from "@/components/atoms/Button/Button";
import { ToolTip } from "@/components/atoms/ToolTip/ToolTip";
import { DemoSection } from "@/components/molecules/Sections/Demo/DemoSection";
import { DemoRow } from "@/components/molecules/Rows/Demo/DemoRow";
import { Plus, Send, Settings, Trash2 } from "lucide-react";

export const ButtonsSection = ({
  loading,
  toggleGlobalLoading,
}: {
  loading: boolean;
  toggleGlobalLoading: () => void;
}) => {
  const { t } = useTranslation();

  return (
    <DemoSection
      title={t(
        "demo.sections.buttons.title",
        "1. Przyciski (Warianty, Rozmiary, Ikony)",
      )}
    >
      <DemoRow>
        <Button variant="primary">
          {t("demo.buttons.variants.primary", "Primary")}
        </Button>
        <Button variant="secondary">
          {t("demo.buttons.variants.secondary", "Secondary")}
        </Button>
        <Button variant="outline">
          {t("demo.buttons.variants.outline", "Outline")}
        </Button>
        <Button variant="ghost">
          {t("demo.buttons.variants.ghost", "Ghost")}
        </Button>
        <Button variant="success">
          {t("demo.buttons.variants.success", "Success")}
        </Button>
        <Button variant="danger">
          {t("demo.buttons.variants.danger", "Danger")}
        </Button>
        <Button variant="purple">
          {t("demo.buttons.variants.purple", "Purple")}
        </Button>
      </DemoRow>

      <DemoRow>
        <Button variant="primary" size="sm">
          {t("demo.buttons.sizes.small", "Small")}
        </Button>
        <Button variant="primary" size="md">
          {t("demo.buttons.sizes.medium", "Medium")}
        </Button>
        <Button variant="primary" size="lg">
          {t("demo.buttons.sizes.large", "Large")}
        </Button>
        <div
          style={{
            width: "1px",
            height: "24px",
            background: "var(--border-color)",
            margin: "0 8px",
          }}
        />
        <Button variant="primary" disabled>
          {t("demo.buttons.states.disabled", "Disabled")}
        </Button>
        <Button variant="primary" isLoading>
          {t("demo.buttons.states.loading", "Loading")}
        </Button>
        <Button variant="danger" onClick={toggleGlobalLoading}>
          {loading
            ? t("demo.buttons.actions.stopLoading", "Zatrzymaj LoadingBar")
            : t("demo.buttons.actions.testLoading", "Testuj LoadingBar")}
        </Button>
      </DemoRow>

      <DemoRow>
        <ToolTip
          content={t("demo.tooltips.addAgency", "Dodaj nową agencję")}
          position="top"
        >
          <Button variant="success" leftIcon={<Plus size={16} />}>
            {t("common.add", "Dodaj")}
          </Button>
        </ToolTip>
        <Button variant="purple" rightIcon={<Send size={16} />}>
          {t("common.send", "Wyślij")}
        </Button>
        <div
          style={{
            width: "1px",
            height: "24px",
            background: "var(--border-color)",
            margin: "0 8px",
          }}
        />
        <ToolTip content={t("common.settings", "Ustawienia")} position="bottom">
          <Button variant="outline" isIcon>
            <Settings size={18} />
          </Button>
        </ToolTip>
        <ToolTip
          content={t("common.deleteItem", "Usuń element")}
          position="right"
        >
          <Button variant="danger" isIcon>
            <Trash2 size={18} />
          </Button>
        </ToolTip>
      </DemoRow>
    </DemoSection>
  );
};
