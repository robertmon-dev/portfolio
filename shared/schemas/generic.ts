import { z } from "zod";

export const zString = z.string().trim().max(255);
export const zText = z.string().trim().max(2000);
export const zContent = z.string().max(30000);

export const zLocale = z.enum(["en", "pl"]);

export const zEmail = z.email("validation.email").max(255);
export const zPassword = z
  .string()
  .min(8, "validation.passwordTooShort")
  .max(100, "validation.passwordTooLong");
export const zUuid = z.uuid();
export const zUrl = z.url("Invalid URL").max(2048);
export const zColor = z
  .string()
  .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "validation.invalidHexColor")
  .max(7);

export const zDateOrString = z.date().or(z.string().max(100));
export const zDatePreprocess = z.preprocess((arg) => {
  if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
  return arg;
}, z.date());

export const zSafeArray = <T extends z.ZodTypeAny>(schema: T, maxItems = 100) =>
  z
    .array(schema)
    .max(maxItems, `Array cannot contain more than ${maxItems} items`);
