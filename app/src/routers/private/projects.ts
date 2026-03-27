import { z } from "zod";
import { router } from "../../trpc/init";
import { protectedProcedure } from "../../trpc/procedures/private";
import { CreateProjectService } from "../../services/project/Create";
import { UpdateProjectService } from "../../services/project/Update";
import { DeleteProjectService } from "../../services/project/Delete";
import {
  CreateProjectSchema,
  UpdateProjectSchema,
  ProjectSchema,
  zUuid,
} from "@portfolio/shared";
import { executeService } from "../../trpc/executers/base";

export const projectPrivateRouter = router({
  create: protectedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/admin/projects",
        tags: ["Projects"],
        summary: "Create a new project",
        description:
          "Adds a new showcase project to the portfolio, including tech stack and links.",
        protect: true,
      },
    })
    .input(CreateProjectSchema)
    .output(ProjectSchema)
    .mutation(async ({ ctx, input }) =>
      executeService(CreateProjectService, ctx, input),
    ),

  update: protectedProcedure
    .meta({
      openapi: {
        method: "PATCH",
        path: "/admin/projects",
        tags: ["Projects"],
        summary: "Update project details",
        description:
          "Updates an existing project. Allows partial updates of fields.",
        protect: true,
      },
    })
    .input(UpdateProjectSchema)
    .output(ProjectSchema)
    .mutation(async ({ ctx, input }) =>
      executeService(UpdateProjectService, ctx, input),
    ),

  delete: protectedProcedure
    .meta({
      openapi: {
        method: "DELETE",
        path: "/admin/projects",
        tags: ["Projects"],
        summary: "Delete project",
        description:
          "Removes a project and its associated metadata from the database.",
        protect: true,
      },
    })
    .input(z.object({ id: zUuid }))
    .output(z.object({ success: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      await executeService(DeleteProjectService, ctx, input.id);
      return { success: true };
    }),
});
