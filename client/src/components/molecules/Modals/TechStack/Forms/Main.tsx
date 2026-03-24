import { useMemo, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { Save, X, Tag, Palette, Box } from "lucide-react";
import {
  TECH_STACK_CATEGORIES,
  type TechStackCategory,
} from "@portfolio/shared";
import { Input } from "@/components/atoms/Input/Input";
import { Select } from "@/components/atoms/Select/Select";
import { Button } from "@/components/atoms/Button/Button";
import { useTechStackForm } from "./useTechstackForm";
import type { TechStackFormProps } from "../types";
import "../TechStackModal.scss";

export const TechStackForm = (props: TechStackFormProps) => {
  const { initialData, onCancel, isLoading } = props;
  const { t } = useTranslation();

  const { register, errors, handleSubmit, watch, setValue } =
    useTechStackForm(props);

  const watchedName = watch("name");
  const watchedColor = watch("color");
  const watchedCategory = watch("category");

  const categoryOptions = useMemo(
    () =>
      TECH_STACK_CATEGORIES.map((category) => ({
        value: category,
        label: t(`admin.techStack.categories.${category}`, category),
      })),
    [t],
  );

  return (
    <form onSubmit={handleSubmit} className="tech-stack-form">
      <div className="tech-stack-form__grid">
        <Input
          {...register("name")}
          label={t("admin.techStack.form.name.label")}
          placeholder={t("admin.techStack.form.name.placeholder")}
          error={errors.name?.message}
          leftIcon={<Tag size={18} />}
          fullWidth
          disabled={isLoading}
        />

        <Select
          label={t("admin.techStack.form.category.label")}
          options={categoryOptions}
          value={watchedCategory}
          onChange={(e) =>
            setValue("category", e.target.value as TechStackCategory)
          }
          error={errors.category?.message}
          leftIcon={<Box size={18} />}
          fullWidth
          placeholder={t("admin.techStack.form.category.placeholder")}
          disabled={isLoading}
        />

        <div className="tech-stack-form__color-section">
          <Input
            {...register("color")}
            label={t("admin.techStack.form.color.label")}
            type="color"
            error={errors.color?.message}
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
                    "--gem-color": watchedColor || "#7aa2f7",
                  } as CSSProperties
                }
              />
              <span className="tech-stack-form__gem-name">
                {watchedName || "Technology"}
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
