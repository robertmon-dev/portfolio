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
