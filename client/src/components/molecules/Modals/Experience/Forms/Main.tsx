import { useTranslation } from "react-i18next";
import { MonthYearSelector } from "@/components/molecules/MonthYearSelector/MonthYearSelector";
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

  const { register, errors, handleSubmit, watch, setValue, control } =
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
          <MonthYearSelector
            name="startDate"
            control={control}
            label={t("admin.experience.form.startDate.label", "Start Date")}
            icon={<Calendar size={18} />}
            disabled={isLoading}
            error={errors.startDate?.message}
            t={t}
          />

          <MonthYearSelector
            name="endDate"
            control={control}
            label={t("admin.experience.form.endDate.label", "End Date")}
            icon={<Calendar size={18} />}
            disabled={isLoading || isCurrent}
            error={errors.endDate?.message}
            t={t}
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
