import type { ControllerRenderProps, Path } from "react-hook-form";
import CalendarDropdown from "../CalendarDropdown/CalendarDropdown";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import type { MonthYearSelectorProps } from "./types";
import type { CreateExperienceInput } from "@portfolio/shared";
import "./MonthYearSelector.scss";

export const MonthYearSelector = ({
  name,
  control,
  label,
  icon,
  disabled,
  t,
  error,
}: MonthYearSelectorProps) => {
  const currentYear = dayjs().year();

  const years = [
    { value: 0, label: t("common.year", "Year") },
    ...Array.from({ length: 50 }, (_, i) => ({
      value: currentYear - i,
      label: (currentYear - i).toString(),
    })),
  ];

  const months = [
    { value: 0, label: t("common.month", "Month") },
    ...Array.from({ length: 12 }, (_, i) => ({
      value: i + 1,
      label: dayjs().month(i).format("MMMM"),
    })),
  ];

  const renderField = ({
    field,
  }: {
    field: ControllerRenderProps<
      CreateExperienceInput,
      Path<CreateExperienceInput>
    >;
  }) => {
    const dateObj = field.value ? dayjs(field.value as string | Date) : null;
    const currentMonth = dateObj && dateObj.isValid() ? dateObj.month() + 1 : 0;
    const currentYearVal = dateObj && dateObj.isValid() ? dateObj.year() : 0;

    const handleSelect = (type: "month" | "year", val: number) => {
      let newM = currentMonth || 1;
      let newY = currentYearVal || currentYear;

      if (type === "month") newM = val || 1;
      if (type === "year") newY = val || currentYear;

      const newDate = dayjs()
        .year(newY)
        .month(newM - 1)
        .date(1)
        .format("YYYY-MM-DD");
      field.onChange(newDate);
    };

    return (
      <div className="month-year-selector">
        <label className="month-year-selector__label">
          {icon}
          <span>{label}</span>
        </label>
        <div className="month-year-selector__dropdowns">
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
        {error && <span className="month-year-selector__error">{error}</span>}
      </div>
    );
  };

  return <Controller name={name} control={control} render={renderField} />;
};
