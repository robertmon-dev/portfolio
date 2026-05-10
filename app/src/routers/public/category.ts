import z from "zod";
import {
  ListTagCategoriesInputSchema,
  ListTagCategoriesOutputSchema,
} from "@portfolio/shared";
import { router } from "../../trpc/init";
import { publicProcedure } from "../../trpc/procedures/public";
import { zUuid, TagCategorySchema } from "@portfolio/shared";
import { executeService } from "src/trpc/executers/base";
import { GetTagCategoriesService } from "src/services/tagCategories/Get";
import { ListTagCategoriesService } from "src/services/tagCategories/List";

export const categoryRouter = router({
  getById: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/categories/{id}",
        tags: ["Categories"],
        summary: "Fetches single tag category by ID",
        description:
          "Returns an tag category with it's relation via provided identifier, firstly hits cache, if not present check for persited data",
        protect: false,
      },
    })
    .input(z.object({ id: zUuid }))
    .output(TagCategorySchema)
    .query(async ({ ctx, input }) => {
      return executeService(GetTagCategoriesService, ctx, input.id);
    }),

  list: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/categories/",
        tags: ["Categories"],
        summary: "Fetches list of tag categories",
        description:
          "Returns paginated list of tag categories. At the very first hits cache, if not present we fallback to database checking for present records",
        protect: false,
      },
    })
    .input(ListTagCategoriesInputSchema)
    .output(ListTagCategoriesOutputSchema)
    .query(async ({ ctx, input }) => {
      return executeService(ListTagCategoriesService, ctx, input);
    }),
});
