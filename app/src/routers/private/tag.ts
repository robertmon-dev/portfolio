import z from "zod";
import { permissionProcedure } from "../../trpc/procedures/permission";
import { router } from "../../trpc/init";
import { executeService } from "../../trpc/executers/base";
import {
  CreateTagSchema,
  FlagEnum,
  ResourceEnum,
  TagSchema,
  UpdateTagSchema,
  zSafeArray,
  zUuid,
} from "@portfolio/shared";
import { CreateTagService } from "../../services/tag/Create";
import { UpdateTagService } from "../../services/tag/Update";
import { DeleteTagsService } from "../../services/tag/Delete";

export const tagsPrivateRouter = router({
  create: permissionProcedure(ResourceEnum.enum.tags, FlagEnum.enum.WRITE)
    .meta({
      openapi: {
        method: "POST",
        path: "/tags",
        tags: ["Tags"],
        summary: "Create a new tag",
        description: "Creates a new tag with the provided details.",
        protect: true,
      },
    })
    .input(CreateTagSchema)
    .output(TagSchema)
    .mutation(async ({ ctx, input }) => {
      return executeService(CreateTagService, ctx, input);
    }),

  update: permissionProcedure(ResourceEnum.enum.tags, FlagEnum.enum.WRITE)
    .meta({
      openapi: {
        method: "PUT",
        path: "/tags",
        tags: ["Tags"],
        summary: "Update an existing tag",
        description:
          "Updates the information of an existing tag based on the provided schema.",
        protect: true,
      },
    })
    .input(UpdateTagSchema)
    .output(TagSchema)
    .mutation(async ({ ctx, input }) => {
      return executeService(UpdateTagService, ctx, input);
    }),

  delete: permissionProcedure(ResourceEnum.enum.tags, FlagEnum.enum.WRITE)
    .meta({
      openapi: {
        method: "DELETE",
        path: "/tags",
        tags: ["Tags"],
        summary: "Delete tags",
        description:
          "Deletes multiple tags at once using an array of their unique UUIDs.",
        protect: true,
      },
    })
    .input(z.object({ ids: zSafeArray(zUuid) }))
    .output(zSafeArray(TagSchema))
    .mutation(async ({ ctx, input }) => {
      return executeService(DeleteTagsService, ctx, input.ids);
    }),
});
