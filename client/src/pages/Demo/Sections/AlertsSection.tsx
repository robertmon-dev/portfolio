import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "@/components/atoms/Alert/Alert";
import { DemoSection } from "@/components/molecules/Sections/Demo/DemoSection";
import { DemoRow } from "@/components/molecules/Rows/Demo/DemoRow";
import { Button } from "@/components/atoms/Button/Button";
import { RotateCcw } from "lucide-react";

export const AlertsSection = () => {
  const { t } = useTranslation();

  const [visible, setVisible] = useState({
    info: true,
    success: true,
    warning: true,
    danger: true,
    minimal: true,
    closable: true,
  });

  const handleClose = (key: keyof typeof visible) => {
    setVisible((prev) => ({ ...prev, [key]: false }));
  };

  const resetAlerts = () => {
    setVisible({
      info: true,
      success: true,
      warning: true,
      danger: true,
      minimal: true,
      closable: true,
    });
  };

  const hasHiddenAlerts = Object.values(visible).some((v) => !v);

  return (
    <DemoSection
      title={t("demo.sections.alerts.title", "2. Alerts & Feedback")}
      action={
        hasHiddenAlerts && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetAlerts}
            leftIcon={<RotateCcw size={14} />}
          >
            {t("demo.alerts.reset", "Reset Alerts")}
          </Button>
        )
      }
    >
      <DemoRow vertical>
        {visible.info && (
          <Alert
            variant="info"
            title={t("demo.alerts.info.title", "System Update")}
            onClose={() => handleClose("info")}
          >
            {t(
              "demo.alerts.info.desc",
              "A new version of the Courvogne palette is available for download.",
            )}
          </Alert>
        )}

        {visible.success && (
          <Alert
            variant="success"
            title={t("demo.alerts.success.title", "Changes Saved")}
            onClose={() => handleClose("success")}
          >
            {t(
              "demo.alerts.success.desc",
              "Your profile has been updated successfully. Database synchronized.",
            )}
          </Alert>
        )}

        {visible.warning && (
          <Alert
            variant="warning"
            title={t("demo.alerts.warning.title", "Account Security")}
            onClose={() => handleClose("warning")}
          >
            {t(
              "demo.alerts.warning.desc",
              "Your password is 6 months old. Consider updating it for better security.",
            )}
          </Alert>
        )}

        {visible.danger && (
          <Alert
            variant="danger"
            title={t("demo.alerts.danger.title", "Critical Error")}
            onClose={() => handleClose("danger")}
          >
            {t(
              "demo.alerts.danger.desc",
              "Unable to establish connection with the tRPC server. Retrying in 5s...",
            )}
          </Alert>
        )}
      </DemoRow>

      <div className="demo-divider" />

      <DemoRow vertical>
        {visible.minimal && (
          <Alert variant="info" onClose={() => handleClose("minimal")}>
            {t(
              "demo.alerts.minimal",
              "Minimal alert without a title for simple inline notifications.",
            )}
          </Alert>
        )}

        {visible.closable && (
          <Alert variant="warning" onClose={() => handleClose("closable")}>
            {t(
              "demo.alerts.closable",
              "This alert is closable. Try clicking the X button on the right.",
            )}
          </Alert>
        )}
      </DemoRow>
    </DemoSection>
  );
};
