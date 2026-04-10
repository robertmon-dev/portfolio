import { router } from "../../trpc/init";
import { strictPublicProcedure } from "src/trpc/procedures/strict";
import {
  ContactFormInputSchema,
  ContactFormOutputSchema,
} from "@portfolio/shared";
import { SubmitContactService } from "../../services/mail/Submit";
import { executeService } from "../../trpc/executers/base";

export const contactPublicRouter = router({
  submit: strictPublicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/contact/submit",
        tags: ["Contact"],
        summary: "Submit contact form",
        description:
          "Accepts contact form data, saves the request, and triggers automated email notifications via BullMQ.",
        protect: false,
      },
    })
    .input(ContactFormInputSchema)
    .output(ContactFormOutputSchema)
    .mutation(async ({ ctx, input }) =>
      executeService(SubmitContactService, ctx, input),
    ),
});
