import z from "zod";
import { zString } from "./generic";
import { zEmail } from "./generic";

export const ContactFormInputSchema = z.object({
  name: zString,
  email: zEmail,
  subject: zString,
  message: zString,
});

export const ContactFormOutputSchema = z.object({
  success: z.boolean(),
  ticketId: zString,
});
