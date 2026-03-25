import { useTranslation } from "react-i18next";
import { Briefcase, Building2, Calendar } from "lucide-react";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { TextArea } from "@/components/atoms/TextArea/TextArea";
import { Checkbox } from "@/components/atoms/CheckBox/CheckBox";
import type { ExperienceFormProps } from "../types";
import { useExperienceForm } from "./useExperienceForm";
import "../ExperienceModal.scss";

export const ExperienceForm = (props: ExperienceFormProps) => {
  const { t } = useTranslation();
  const { isLoading, initialData, onCancel } = props;

  const { register, errors, handleSubmit, watch, setValue } =
    useExperienceForm(props);

  const isCurrent = watch("isCurrent");

  return (
    <form onSubmit={handleSubmit} className="experience-form">
      <div className="experience-form__grid">
        <Input
          {...register("position")}
          label={t("admin.experience.form.position.label", "Position")}
          error={errors.position?.message}
          leftIcon={<Briefcase size={18} />}
          fullWidth
          required
          disabled={isLoading}
        />

        <Input
          {...register("company")}
          label={t("admin.experience.form.company.label", "Company")}
          error={errors.company?.message}
          leftIcon={<Building2 size={18} />}
          fullWidth
          required
          disabled={isLoading}
        />

        <div className="grid-row-dual">
          <Input
            type="date"
            {...register("startDate")}
            label={t("admin.experience.form.startDate.label", "Start Date")}
            error={errors.startDate?.message}
            leftIcon={<Calendar size={18} />}
            fullWidth
            required
            disabled={isLoading}
          />
          <Input
            type="date"
            {...register("endDate")}
            label={t("admin.experience.form.endDate.label", "End Date")}
            error={errors.endDate?.message}
            leftIcon={<Calendar size={18} />}
            fullWidth
            disabled={isLoading || isCurrent}
          />
        </div>

        <div className="experience-form__toggles">
          <Checkbox
            label={t(
              "admin.experience.form.isCurrent.label",
              "I currently work here",
            )}
            checked={isCurrent}
            onChange={(e) => setValue("isCurrent", e.target.checked)}
            disabled={isLoading}
          />
        </div>

        <TextArea
          {...register("description")}
          label={t("admin.experience.form.description.label", "Description")}
          error={errors.description?.message}
          fullWidth
          disabled={isLoading}
          rows={4}
        />
      </div>

      <div className="experience-form__actions">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={isLoading}
        >
          {t("common.cancel", "Cancel")}
        </Button>
        <Button type="submit" variant="primary" isLoading={isLoading}>
          {initialData
            ? t("common.save", "Save Changes")
            : t("common.create", "Add Experience")}
        </Button>
      </div>
    </form>
  );
};
