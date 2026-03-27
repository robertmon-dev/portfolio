import { z } from "zod";
import * as g from "../schemas/generic";

export type StringValue = z.infer<typeof g.zString>;
export type TextValue = z.infer<typeof g.zText>;
export type ContentValue = z.infer<typeof g.zContent>;

export type EmailValue = z.infer<typeof g.zEmail>;
export type PasswordValue = z.infer<typeof g.zPassword>;
export type UuidValue = z.infer<typeof g.zUuid>;
export type UrlValue = z.infer<typeof g.zUrl>;
export type ColorValue = z.infer<typeof g.zColor>;

export type DateOrStringValue = z.infer<typeof g.zDateOrString>;
export type DateValue = z.infer<typeof g.zDatePreprocess>;
