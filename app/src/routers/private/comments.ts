import { z } from "zod";
import {
  CommentSchema,
  CreateCommentSchema,
  DeleteCommentsSchema,
  FlagEnum,
  ListCommentsInputSchema,
  ResourceEnum,
  UpdateCommentSchema,
  ListCommentsOutputSchema,
  zUuid,
  ListCommentsByParentSchema,
  ListCommentsByPostSchema,
} from "@portfolio/shared";
import { CreateCommentService } from "../../services/comments/Create";
import { router } from "../../trpc/init";
import { permissionProcedure } from "../../trpc/procedures/permission";
import {
  executeAuthorizedService,
  executeService,
} from "src/trpc/executers/base";
import { UpdateCommentService } from "../../services/comments/Update";
import { DeleteCommentsService } from "../../services/comments/Delete";
import { ListCommentsService } from "../../services/comments/List";
import { GetCommentService } from "../../services/comments/Get";
import { ListCommentsByParentService } from "../../services/comments/ByParent";
import { ListCommentsByPostService } from "../../services/comments/ByPost";

export const commentsPrivateRouter = router({
  create: permissionProcedure(ResourceEnum.enum.comments, FlagEnum.enum.WRITE)
    .meta({
      openapi: {
        method: "POST",
        path: "/admin/comments",
        tags: ["Comments"],
        summary: "Create a new comment",
        description: "Creates a new comment with the provided data.",
        protect: true,
      },
    })
    .input(CreateCommentSchema)
    .output(CommentSchema)
    .mutation(async ({ ctx, input }) => {
      return executeAuthorizedService(CreateCommentService, ctx, input);
    }),

  update: permissionProcedure(ResourceEnum.enum.comments, FlagEnum.enum.WRITE)
    .meta({
      openapi: {
        method: "PATCH",
        path: "/admin/comments",
        tags: ["Comments"],
        summary: "Update an existing comment",
        description: "Updates comment data based on the provided input.",
        protect: true,
      },
    })
    .input(UpdateCommentSchema)
    .output(CommentSchema)
    .mutation(async ({ ctx, input }) => {
      return executeAuthorizedService(UpdateCommentService, ctx, input);
    }),

  delete: permissionProcedure(ResourceEnum.enum.comments, FlagEnum.enum.WRITE)
    .meta({
      openapi: {
        method: "DELETE",
        path: "/admin/comments",
        tags: ["Comments"],
        summary: "Delete comments",
        description:
          "Removes comments from the database based on the provided input.",
        protect: true,
      },
    })
    .input(DeleteCommentsSchema)
    .output(CommentSchema)
    .mutation(async ({ ctx, input }) => {
      return executeAuthorizedService(DeleteCommentsService, ctx, input);
    }),

  list: permissionProcedure(ResourceEnum.enum.comments, FlagEnum.enum.READ)
    .meta({
      openapi: {
        method: "GET",
        path: "/admin/comments",
        tags: ["Comments"],
        summary: "List all comments",
        description:
          "Retrieves a paginated list of all comments (both deleted and not).",
        protect: true,
      },
    })
    .input(ListCommentsInputSchema)
    .output(ListCommentsOutputSchema)
    .query(async ({ ctx, input }) => {
      return executeService(ListCommentsService, ctx, {
        ...input,
        includeDeleted: true,
      });
    }),

  listByParent: permissionProcedure(
    ResourceEnum.enum.comments,
    FlagEnum.enum.READ,
  )
    .meta({
      openapi: {
        method: "GET",
        path: "/admin/comments/by-parent",
        tags: ["Comments"],
        summary: "List comments by parent",
        description:
          "Retrieves a paginated list of replies for a specific parent comment.",
        protect: true,
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

  listByPost: permissionProcedure(
    ResourceEnum.enum.comments,
    FlagEnum.enum.READ,
  )
    .meta({
      openapi: {
        method: "GET",
        path: "/admin/comments/by-post",
        tags: ["Comments"],
        summary: "List comments by post",
        description:
          "Retrieves a paginated list of comments associated with a specific post.",
        protect: true,
      },
    })
    .input(ListCommentsByPostSchema)
    .output(ListCommentsOutputSchema)
    .query(async ({ ctx, input }) => {
      return executeService(ListCommentsByPostService, ctx, {
        ...input,
        includeDeleted: true,
      });
    }),

  getById: permissionProcedure(ResourceEnum.enum.comments, FlagEnum.enum.READ)
    .meta({
      openapi: {
        method: "GET",
        path: "/admin/comments/{id}",
        tags: ["Comments"],
        summary: "Get a specific comment",
        description: "Retrieves a specific comment by its unique identifier.",
        protect: true,
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
