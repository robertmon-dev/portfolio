import { z } from "zod";
import {
  zUuid,
  CommentSchema,
  ListCommentsByParentSchema,
  ListCommentsByPostSchema,
  ListCommentsOutputSchema,
} from "@portfolio/shared";
import { router } from "../../trpc/init";
import { publicProcedure } from "../../trpc/procedures/public";
import { executeService } from "../../trpc/executers/base";
import { GetCommentService } from "../../services/comments/Get";
import { ListCommentsByParentService } from "../../services/comments/ByParent";
import { ListCommentsByPostService } from "../../services/comments/ByPost";

export const commentsRouter = router({
  listByParent: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/comments/by-parent",
        tags: ["Comments"],
        summary: "List comments by parent",
        description:
          "Retrieves a paginated list of replies for a specific parent comment.",
        protect: false,
      },
    })
    .input(ListCommentsByParentSchema)
    .output(ListCommentsOutputSchema)
    .query(async ({ ctx, input }) => {
      return executeService(ListCommentsByParentService, ctx, {
        ...input,
        includeDeleted: true,
      });
    }),

  listByPost: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/comments/by-post",
        tags: ["Comments"],
        summary: "List comments by post",
        description:
          "Retrieves a paginated list of comments associated with a specific post.",
        protect: false,
      },
    })
    .input(ListCommentsByPostSchema)
    .output(ListCommentsOutputSchema)
    .query(async ({ ctx, input }) => {
      return executeService(ListCommentsByPostService, ctx, {
        ...input,
        includeDeleted: false,
      });
    }),

  getById: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/comments/{id}",
        tags: ["Comments"],
        summary: "Get a specific comment",
        description: "Retrieves a specific comment by its unique identifier.",
        protect: false,
      },
    })
    .input(z.object({ id: zUuid }))
    .output(CommentSchema)
    .query(async ({ ctx, input }) => {
      return executeService(GetCommentService, ctx, {
        commentId: input.id,
        includeDeleted: false,
      });
    }),
});
