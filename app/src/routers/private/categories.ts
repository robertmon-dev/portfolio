import z from "zod";
import { permissionProcedure } from "src/trpc/procedures/permission";
import { router } from "../../trpc/init";
import {
  AssignTagsSchema,
  CreateTagCategorySchema,
  FlagEnum,
  ResourceEnum,
  TagCategorySchema,
  UpdateTagCategorySchema,
} from "@portfolio/shared";
import { executeAuthorizedService } from "../../trpc/executers/base";
import { zUuid, zSafeArray } from "@portfolio/shared";
import { CreateTagCategoryService } from "../../services/tagCategories/Create";
import { DeleteTagCategoriesService } from "../../services/tagCategories/Delete";
import { UpdateTagCategory } from "../../services/tagCategories/Update";
import { AssignTagsService } from "src/services/tagCategories/AssignTags";

export const categoriesPrivateRouter = router({
  create: permissionProcedure(
    ResourceEnum.enum.tagCategories,
    FlagEnum.enum.WRITE,
  )
    .meta({
      openapi: {
        method: "POST",
        path: "/admin/categories/",
        tags: ["Categories"],
        summary: "Creates new tags category",
        description:
          "Creates new single tag category record in database as proper payload passed",
        protect: true,
      },
    })
    .input(CreateTagCategorySchema)
    .output(TagCategorySchema)
    .mutation(async ({ ctx, input }) => {
      return executeAuthorizedService(CreateTagCategoryService, ctx, input);
    }),

  delete: permissionProcedure(
    ResourceEnum.enum.tagCategories,
    FlagEnum.enum.WRITE,
  )
    .meta({
      openapi: {
        method: "DELETE",
        path: "/admin/categories",
        tags: ["Categories"],
        summary: "Deletes targeted categories",
        description:
          "Fetches persisted categories from database, if all of them are present removes them and clears cache",
        protect: true,
      },
    })
    .input(z.object({ ids: zSafeArray(zUuid) }))
    .mutation(async ({ ctx, input }) => {
      return executeAuthorizedService(
        DeleteTagCategoriesService,
        ctx,
        input.ids,
      );
    }),

  update: permissionProcedure(
    ResourceEnum.enum.tagCategories,
    FlagEnum.enum.WRITE,
  )
    .meta({
      openapi: {
        method: "PATCH",
        path: "/admin/categories",
        tags: ["Categories"],
        summary: "Patches targeted category",
        description:
          "Fetches persisted categories from passed ids in payload, if all of them are present performs update",
        protect: true,
      },
    })
    .input(UpdateTagCategorySchema)
    .output(TagCategorySchema)
    .mutation(async ({ ctx, input }) => {
      return executeAuthorizedService(UpdateTagCategory, ctx, input);
    }),

  assignTags: permissionProcedure(
    ResourceEnum.enum.tagCategories,
    FlagEnum.enum.WRITE,
  )
    .meta({
      openapi: {
        method: "PATCH",
        path: "/admin/categories/assignTags",
        tags: ["Categories"],
        summary: "Assigns tags for selected categories",
        description: "At the very first it fetches  ",
        protect: true,
      },
    })
    .input(AssignTagsSchema)
    .output(zSafeArray(TagCategorySchema))
    .mutation(async ({ ctx, input }) => {
      return executeAuthorizedService(AssignTagsService, ctx, input);
    }),
});
