import { z } from "zod";
import { router } from "../../trpc/init";
import { protectedProcedure } from "../../trpc/procedures/private";
import { CreateTechStackService } from "../../services/techStack/Create";
import { UpdateTechStackService } from "../../services/techStack/Update";
import { DeleteTechStackService } from "../../services/techStack/Delete";
import { LinkTechStackProjectService } from "../../services/techStack/Link";
import { UnlinkTechStackProjectService } from "../../services/techStack/Unlink";
import {
  CreateTechStackSchema,
  UpdateTechStackSchema,
  LinkTechStackProjectSchema,
  TechStackSchema,
} from "@portfolio/shared";
import { executeService } from "../../trpc/executers/base";

export const techStackPrivateRouter = router({
  create: protectedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/techstack",
        tags: ["TechStack"],
        summary: "Create new technology",
        description:
          "Adds a new technology (e.g., React, Node.js) to the global list.",
        protect: true,
      },
    })
    .input(CreateTechStackSchema)
    .output(TechStackSchema)
    .mutation(async ({ ctx, input }) =>
      executeService(CreateTechStackService, ctx, input),
    ),

  update: protectedProcedure
    .meta({
      openapi: {
        method: "PATCH",
        path: "/techstack",
        tags: ["TechStack"],
        summary: "Update technology details",
        description:
          "Updates an existing technology's name, icon, or category.",
        protect: true,
      },
    })
    .input(UpdateTechStackSchema)
    .output(TechStackSchema)
    .mutation(async ({ ctx, input }) =>
      executeService(UpdateTechStackService, ctx, input),
    ),

  delete: protectedProcedure
    .meta({
      openapi: {
        method: "DELETE",
        path: "/techstack",
        tags: ["TechStack"],
        summary: "Bulk delete technologies",
        description: "Removes multiple technologies from the global list.",
        protect: true,
      },
    })
    .input(
      z.object({
        ids: z.array(z.uuid()),
      }),
    )
    .output(z.object({ success: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      await executeService(DeleteTechStackService, ctx, input.ids);
      return { success: true };
    }),

  linkProject: protectedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/techstack/link",
        tags: ["TechStack"],
        summary: "Link tech to project",
        description:
          "Associates a technology with a specific portfolio project.",
        protect: true,
      },
    })
    .input(LinkTechStackProjectSchema)
    .output(z.object({ success: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      await executeService(LinkTechStackProjectService, ctx, input);
      return { success: true };
    }),

  unlinkProject: protectedProcedure
    .meta({
      openapi: {
        method: "DELETE",
        path: "/techstack/link",
        tags: ["TechStack"],
        summary: "Unlink tech from project",
        description:
          "Removes the association between a technology and a project.",
        protect: true,
      },
    })
    .input(LinkTechStackProjectSchema)
    .output(z.object({ success: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      await executeService(UnlinkTechStackProjectService, ctx, input);
      return { success: true };
    }),
});
