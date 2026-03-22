import { useMemo, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/atoms/Input/Input";
import { Select } from "@/components/atoms/Select/Select";
import { Button } from "@/components/atoms/Button/Button";
import { useTechStackForm } from "./useTechstackForm";
import type { TechStackFormProps } from "../types";
import { Save, X, Tag, Palette, Box } from "lucide-react";
import { TECH_STACK_CATEGORIES } from "@portfolio/shared";
import "../TechStackModal.scss";

export const TechStackForm = ({
  initialData,
  onCreate,
  onCancel,
  isLoading,
}: TechStackFormProps) => {
  const { t } = useTranslation();

  const categoryOptions = useMemo(
    () =>
      TECH_STACK_CATEGORIES.map((category) => ({
        value: category,
        label: t(`admin.techStack.categories.${category}`, category),
      })),
    [t],
  );

  const { formData, errors, handleChange, handleSubmit } = useTechStackForm({
    initialData,
    onCreate,
    onCancel,
  });

  return (
    <form onSubmit={handleSubmit} className="tech-stack-form">
      <div className="tech-stack-form__grid">
        <Input
          label={t("admin.techStack.form.name.label")}
          placeholder={t("admin.techStack.form.name.placeholder")}
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          error={errors.name}
          leftIcon={<Tag size={18} />}
          fullWidth
          disabled={isLoading}
        />

        <Select
          label={t("admin.techStack.form.category.label")}
          options={categoryOptions}
          value={formData.category}
          onChange={(e) => handleChange("category", e.target.value as any)}
          error={errors.category}
          leftIcon={<Box size={18} />}
          fullWidth
          placeholder={t("admin.techStack.form.category.placeholder")}
          disabled={isLoading}
        />

        <div className="tech-stack-form__color-section">
          <Input
            label={t("admin.techStack.form.color.label")}
            type="color"
            value={formData.color || "#7aa2f7"}
            onChange={(e) => handleChange("color", e.target.value)}
            error={errors.color}
            leftIcon={<Palette size={18} />}
            disabled={isLoading}
            fullWidth
          />

          <div className="tech-stack-form__preview-container">
            <span className="tech-stack-form__preview-label">
              {t("admin.techStack.form.preview.label", "Live Preview")}
            </span>
            <div className="tech-stack-form__gem-wrapper">
              <div
                className="techstack-table__gem techstack-table__gem--large"
                style={
                  {
                    "--gem-color": formData.color || "#7aa2f7",
                  } as CSSProperties
                }
              />
              <span className="tech-stack-form__gem-name">
                {formData.name || "Technology"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="tech-stack-form__actions">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={isLoading}
        >
          <X size={18} /> {t("common.cancel")}
        </Button>
        <Button type="submit" variant="primary" isLoading={isLoading}>
          <Save size={18} />{" "}
          {initialData
            ? t("admin.techStack.form.actions.update")
            : t("admin.techStack.form.actions.create")}
        </Button>
      </div>
    </form>
  );
};
