import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import { Briefcase, Building2, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { TextArea } from "@/components/atoms/TextArea/TextArea";
import { Checkbox } from "@/components/atoms/CheckBox/CheckBox";
import CalendarDropdown from "@/components/molecules/CalendarDropdown/CalendarDropdown";
import type { ExperienceFormProps } from "../types";
import { useExperienceForm } from "./useExperienceForm";
import "../ExperienceModal.scss";

const MonthYearSelector = ({
  name,
  control,
  label,
  icon,
  disabled,
  t,
  error,
}: any) => {
  const currentYear = dayjs().year();

  const years = [
    { value: 0, label: t("common.year", "Year") }, // Placeholder
    ...Array.from({ length: 50 }, (_, i) => ({
      value: currentYear - i,
      label: (currentYear - i).toString(),
    })),
  ];

  const months = [
    { value: 0, label: t("common.month", "Month") }, // Placeholder
    ...Array.from({ length: 12 }, (_, i) => ({
      value: i + 1,
      label: dayjs().month(i).format("MMMM"), // Zwróci "January", "February" itp.
    })),
  ];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        // Parsowanie obecnego stringa "YYYY-MM-DD" do wartości liczbowych
        const dateObj = field.value ? dayjs(field.value) : null;
        const currentMonth =
          dateObj && dateObj.isValid() ? dateObj.month() + 1 : 0;
        const currentYearVal =
          dateObj && dateObj.isValid() ? dateObj.year() : 0;

        const handleSelect = (type: "month" | "year", val: number) => {
          let newM = currentMonth || 1; // Domyślnie styczeń, jeśli wcześniej było pusto
          let newY = currentYearVal || currentYear; // Domyślnie obecny rok

          if (type === "month") newM = val || 1;
          if (type === "year") newY = val || currentYear;

          // Złożenie i aktualizacja w RHF jako string YYYY-MM-DD
          const newDate = dayjs()
            .year(newY)
            .month(newM - 1)
            .date(1)
            .format("YYYY-MM-DD");
          field.onChange(newDate);
        };

        return (
          <div className="experience-form__custom-date">
            <label className="experience-form__custom-label">
              {icon}
              <span>{label}</span>
            </label>
            <div className="experience-form__dropdowns">
              <CalendarDropdown
                value={currentMonth}
                options={months}
                onSelect={(val) => handleSelect("month", val)}
                ariaLabel={`${label} month`}
                disabled={disabled}
              />
              <CalendarDropdown
                value={currentYearVal}
                options={years}
                onSelect={(val) => handleSelect("year", val)}
                ariaLabel={`${label} year`}
                disabled={disabled}
              />
            </div>
            {error && <span className="experience-form__error">{error}</span>}
          </div>
        );
      }}
    />
  );
};

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
          {/* Zastępujemy <Input type="date"> nowym selektorem */}
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
