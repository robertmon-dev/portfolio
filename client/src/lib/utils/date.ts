import type { TFunction } from "i18next";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export const toIso = (date: string | Date): string => {
  return new Date(date).toISOString();
};

export const toNullableIso = (date?: string | Date | null): string | null => {
  if (!date) return null;
  return new Date(date).toISOString();
};

export const toOptionalIso = (
  date?: string | Date | null,
): string | undefined => {
  if (!date) return undefined;
  return new Date(date).toISOString();
};

export const toHtmlDate = (date?: string | Date | null): string => {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
};

export const getTenure = (
  start: string | Date,
  end: string | Date | null,
  isCurrent: boolean,
  t: TFunction,
) => {
  const startDate = dayjs(start);
  const endDate = isCurrent ? dayjs() : dayjs(end);
  const diff = dayjs.duration(endDate.diff(startDate));

  const years = diff.years();
  const months = diff.months();

  const parts = [];
  if (years > 0) parts.push(`${years}${t("common.time.y", "y")}`);
  if (months > 0 || years === 0)
    parts.push(`${months}${t("common.time.m", "m")}`);

  return parts.join(" ");
};
