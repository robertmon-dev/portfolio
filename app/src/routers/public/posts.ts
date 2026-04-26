import { z } from "zod";
import { router } from "../../trpc/init";
import { executeService } from "../../trpc/executers/base";
import { publicProcedure } from "../../trpc/procedures/public";
import {
  ListPostsInputSchema,
  ListPostsOutputSchema,
  PostSchema,
  zUuid,
} from "@portfolio/shared";
import { GetPostService } from "../../services/post/Get";
import { ListPostsService } from "../../services/post/List";

export const postsRouter = router({
  get: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/posts/{id}",
        tags: ["Posts"],
        summary: "Get post by ID",
        description: "Fetches a single post by its unique identifier.",
        protect: false,
      },
    })
    .input(z.object({ id: zUuid }))
    .output(PostSchema)
    .query(({ ctx, input }) => {
      return executeService(GetPostService, ctx, input.id);
    }),

  list: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/posts",
        tags: ["Posts"],
        summary: "List posts",
        description: "Retrieves a paginated list of posts.",
        protect: false,
      },
    })
    .input(ListPostsInputSchema)
    .output(ListPostsOutputSchema)
    .query(({ ctx, input }) => {
      return executeService(ListPostsService, ctx, input);
    }),
});
