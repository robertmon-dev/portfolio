import z from "zod";
import * as m from "../schemas/mail";

export type ContactFormInput = z.infer<typeof m.ContactFormInputSchema>;
export type ContactFormOutput = z.infer<typeof m.ContactFormOutputSchema>;
