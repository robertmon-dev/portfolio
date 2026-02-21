import { useTranslation } from "react-i18next";
import { Checkbox } from "@/components/atoms/CheckBox/CheckBox";
import { Switch } from "@/components/atoms/Switch/Switch";
import { Tag } from "@/components/atoms/Tag/Tag";
import { TextArea } from "@/components/atoms/TextArea/TextArea";
import { Card } from "@/components/atoms/Card/Card";
import { DemoSection } from "@/components/molecules/Sections/Demo/DemoSection";
import { DemoRow } from "@/components/molecules/Rows/Demo/DemoRow";
import { Check } from "lucide-react";

export const FormsSection = ({
  checked,
  setChecked,
}: {
  checked: boolean;
  setChecked: (val: boolean) => void;
}) => {
  const { t } = useTranslation();

  return (
    <DemoSection
      title={t("demo.sections.forms.title", "5. Forms & Selection")}
      columns={2}
    >
      <Card variant="elevated" className="demo-forms-card">
        <h3 className="demo-list-title">
          {t("demo.forms.checkboxes.title", "Checkboxes (States & Colors)")}
        </h3>

        <DemoRow>
          <Checkbox
            label={t("demo.forms.checkboxes.default", "Default (uncontrolled)")}
          />
          <Checkbox
            label={t("demo.forms.checkboxes.controlled", "Controlled (active)")}
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
        </DemoRow>

        <DemoRow>
          <Checkbox
            label={t("demo.forms.checkboxes.disabled", "Disabled")}
            disabled
          />
          <Checkbox
            label={t("demo.forms.checkboxes.disabledChecked", "Disabled (checked)")}
            disabled
            defaultChecked
          />
          <div
            style={{
              width: "1px",
              height: "24px",
              background: "var(--border-color)",
              margin: "0 8px",
            }}
          />
          <Checkbox
            label={t("demo.forms.checkboxes.error", "Validation error")}
            error
          />
          <Checkbox
            label={t("demo.forms.checkboxes.errorChecked", "Error (checked)")}
            error
            defaultChecked
          />
        </DemoRow>

        <DemoRow>
          <Checkbox
            label={t("demo.forms.checkboxes.colorSuccess", "Success (Green)")}
            defaultChecked
            colorChecked="#9ece6a"
          />
          <Checkbox
            label={t("demo.forms.checkboxes.colorPurple", "Purple")}
            defaultChecked
            colorChecked="#bb9af7"
          />
          <Checkbox
            label={t("demo.forms.checkboxes.colorWarning", "Warning")}
            defaultChecked
            colorChecked="#e0af68"
          />
        </DemoRow>
      </Card>

      <div
        className="demo-section__grid demo-section__grid--2col"
        style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}
      >
        <Card
          variant="elevated"
          className="demo-forms-card"
          style={{ flex: 1 }}
        >
          <h3 className="demo-list-title">
            {t("demo.forms.switches.title", "Switches")}
          </h3>
          <Switch
            label={t("demo.forms.switches.darkMode", "Dark Mode")}
            defaultChecked
          />
          <hr className="demo-divider" />
          <DemoRow>
            <Switch
              label={t("demo.forms.switches.alerts", "Alerts")}
              colorOn="var(--tn-green)"
              iconOn={<Check size={10} />}
            />
            <Tag variant="info" size="sm">
              {t("demo.tags.beta", "Beta")}
            </Tag>
          </DemoRow>
        </Card>

        <Card variant="elevated" style={{ flex: 1 }}>
          <h3 className="demo-list-title">
            {t("demo.forms.textFields.title", "Text Fields")}
          </h3>
          <TextArea
            label={t("demo.forms.textFields.notesLabel", "Notes")}
            fullWidth
            placeholder={t(
              "demo.forms.textFields.notesPlaceholder",
              "Add some description...",
            )}
          />
        </Card>
      </div>
    </DemoSection>
  );
};
