import { permissionProcedure } from "src/trpc/procedures/permission";
import { router } from "../../trpc/init";
import {
  CreateTagCategorySchema,
  FlagEnum,
  ResourceEnum,
  TagCategorySchema,
} from "@portfolio/shared";
import { executeAuthorizedService } from "../../trpc/executers/base";
import { CreateTagCategoryService } from "src/services/tagCategories/Create";

export const categoriesPrivateRouter = router({
  create: permissionProcedure(
    ResourceEnum.enum.tagCategories,
    FlagEnum.enum.WRITE,
  )
    .input(CreateTagCategorySchema)
    .output(TagCategorySchema)
    .mutation(async ({ ctx, input }) => {
      return executeAuthorizedService(CreateTagCategoryService, ctx, input);
    }),
});
