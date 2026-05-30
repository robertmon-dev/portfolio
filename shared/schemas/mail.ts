import z from "zod";
import { zString, zLocale, zEmail } from "./generic";

export const ContactFormInputSchema = z.object({
  name: zString,
  email: zEmail,
  subject: zString,
  message: zString,
  locale: zLocale,
});

export const ContactFormOutputSchema = z.object({
  success: z.boolean(),
  ticketId: zString,
});
