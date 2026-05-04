import z from "zod";
import {
  ListTagsByCategoryInputSchema,
  ListTagsInputSchema,
  ListTagsOutputSchema,
  TagSchema,
  zUuid,
} from "@portfolio/shared";
import { router } from "../../trpc/init";
import { executeService } from "../../trpc/executers/base";
import { publicProcedure } from "../../trpc/procedures/public";
import { GetTagService } from "../../services/tag/Get";
import { ListTagsService } from "../../services/tag/List";
import { ListTagsByCategoryService } from "../../services/tag/ListByCategory";

export const tagsRouter = router({
  getById: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/tags/{id}",
        tags: ["Tags"],
        summary: "Get tag by ID",
        description:
          "Retrieves detailed information about a specific tag using its unique UUID.",
        protect: false,
      },
    })
    .input(z.object({ id: zUuid }))
    .output(TagSchema.nullable())
    .query(async ({ ctx, input }) => {
      return executeService(GetTagService, ctx, input.id);
    }),

  list: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/tags",
        tags: ["Tags"],
        summary: "List all tags",
        description:
          "Retrieves a paginated list of active tags based on provided filters.",
        protect: false,
      },
    })
    .input(ListTagsInputSchema)
    .output(ListTagsOutputSchema)
    .query(async ({ ctx, input }) => {
      return executeService(ListTagsService, ctx, input);
    }),

  listByCategory: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/tags/category",
        tags: ["Tags"],
        summary: "List tags by category",
        description:
          "Fetches a paginated list of tags filtered by a specific category.",
        protect: false,
      },
    })
    .input(ListTagsByCategoryInputSchema)
    .output(ListTagsOutputSchema)
    .query(async ({ ctx, input }) => {
      return executeService(ListTagsByCategoryService, ctx, input);
    }),
});
