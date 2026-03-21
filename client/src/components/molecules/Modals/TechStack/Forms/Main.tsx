import { useTranslation } from "react-i18next";
import { Input } from "@/components/atoms/Input/Input";
import { Button } from "@/components/atoms/Button/Button";
import { useTechStackForm } from "./useTechstackForm";
import { TechStackFormProps } from "../types";
import { Save, X, Tag, Palette, Box } from "lucide-react";
import "../TechStackModal.scss";

export const TechStackForm = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}: TechStackFormProps) => {
  const { t } = useTranslation();

  const { formData, errors, handleChange, handleSubmit } = useTechStackForm({
    initialData,
    onSubmit,
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

        <Input
          label={t("admin.techStack.form.category.label")}
          placeholder={t("admin.techStack.form.category.placeholder")}
          value={formData.category}
          onChange={(e) => handleChange("category", e.target.value)}
          error={errors.category}
          leftIcon={<Box size={18} />}
          fullWidth
          disabled={isLoading}
        />

        <Input
          label={t("admin.techStack.form.color.label")}
          type="color"
          value={formData.color}
          onChange={(e) => handleChange("color", e.target.value)}
          error={errors.color}
          leftIcon={<Palette size={18} />}
          fullWidth
          disabled={isLoading}
        />
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
            ? t("admin.techStack.form.actions.update", "Update")
            : t("admin.techStack.form.actions.create", "Create")}
        </Button>
      </div>
    </form>
  );
};
