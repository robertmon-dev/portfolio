import { z } from "zod";

export const zString = z.string().max(255);
export const zText = z.string().max(2000);
export const zContent = z.string().max(30000);

export const zEmail = z.email("Invalid email address").max(255);
export const zPassword = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(100, "Password is too long");
export const zUuid = z.uuid();
export const zUrl = z.url("Invalid URL").max(2048);
export const zColor = z
  .string()
  .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color")
  .max(7);

export const zDateOrString = z.date().or(z.string().max(100));
export const zDatePreprocess = z.preprocess((arg) => {
  if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
  return arg;
}, z.date());
