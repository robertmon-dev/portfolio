import { z } from "zod";
import { router } from "../../trpc/init";
import { permissionProcedure } from "../../trpc/procedures/permission";
import { CreateExperienceService } from "../../services/experience/Create";
import { UpdateExperienceService } from "../../services/experience/Update";
import { DeleteExperienceService } from "../../services/experience/Delete";
import {
  CreateExperienceSchema,
  UpdateExperienceSchema,
  ExperienceSchema,
  DeleteExperienceInputSchema,
  FlagEnum,
} from "@portfolio/shared";
import { executeService } from "../../trpc/executers/base";

export const experiencePrivateRouter = router({
  create: permissionProcedure("experience:create", FlagEnum.enum.WRITE)
    .meta({
      openapi: {
        method: "POST",
        path: "/admin/experience",
        tags: ["Experience"],
        summary: "Create new experience",
        description:
          "Adds a new professional experience or project to the portfolio.",
        protect: true,
      },
    })
    .input(CreateExperienceSchema)
    .output(ExperienceSchema)
    .mutation(async ({ ctx, input }) =>
      executeService(CreateExperienceService, ctx, input),
    ),

  update: permissionProcedure("experience:update", FlagEnum.enum.WRITE)
    .meta({
      openapi: {
        method: "PATCH",
        path: "/admin/experience",
        tags: ["Experience"],
        summary: "Update experience",
        description: "Updates existing experience details using its ID.",
        protect: true,
      },
    })
    .input(UpdateExperienceSchema)
    .output(ExperienceSchema)
    .mutation(async ({ ctx, input }) =>
      executeService(UpdateExperienceService, ctx, input),
    ),

  delete: permissionProcedure("experience:delete", FlagEnum.enum.WRITE)
    .meta({
      openapi: {
        method: "DELETE",
        path: "/admin/experience",
        tags: ["Experience"],
        summary: "Bulk delete experiences",
        description:
          "Deletes multiple experiences at once using an array of UUIDs.",
        protect: true,
      },
    })
    .input(DeleteExperienceInputSchema)
    .output(z.void())
    .mutation(
      async ({ ctx, input }) =>
        await executeService(DeleteExperienceService, ctx, input.ids),
    ),
});
