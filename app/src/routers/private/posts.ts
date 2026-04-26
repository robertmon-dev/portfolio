import { router } from "../../trpc/init";
import { permissionProcedure } from "../../trpc/procedures/permission";
import {
  CreatePostSchema,
  DeletePostSchema,
  PostSchema,
  UpdatePostSchema,
  AssignCommentsForPostSchema,
  ChangePublishionForPostSchema,
  AssignTagsForPostSchema,
  AssignReactionsForPostSchema,
} from "@portfolio/shared";
import { ResourceEnum, FlagEnum } from "@portfolio/shared";
import { executeAuthorizedService } from "../../trpc/executers/base";
import { CreatePostService } from "../../services/post/Create";
import { UpdatePostService } from "../../services/post/Update";
import { DeletePostService } from "../../services/post/Delete";
import { ChangePostVisilibityService } from "../../services/post/ChangePostVisibility";
import { AssignCommentsForPostService } from "../../services/post/AssignCommentsForPost";
import { AssignTagsForPostService } from "../../services/post/AssignTagsForPost";
import { AssignReactionsForPostService } from "../../services/post/AssignReactionsForPost";

export const postsPrivateRouter = router({
  create: permissionProcedure(ResourceEnum.enum.posts, FlagEnum.enum.WRITE)
    .meta({
      openapi: {
        method: "POST",
        path: "/admin/posts",
        tags: ["Posts"],
        summary: "Create a new post",
        description: "Creates a new post with the provided data.",
        protect: true,
      },
    })
    .input(CreatePostSchema)
    .output(PostSchema)
    .mutation(({ ctx, input }) => {
      return executeAuthorizedService(CreatePostService, ctx, input);
    }),

  update: permissionProcedure(ResourceEnum.enum.posts, FlagEnum.enum.WRITE)
    .meta({
      openapi: {
        method: "PATCH",
        path: "/admin/posts",
        tags: ["Posts"],
        summary: "Update an existing post",
        description: "Updates post data based on the provided input.",
        protect: true,
      },
    })
    .input(UpdatePostSchema)
    .output(PostSchema.nullable())
    .mutation(({ ctx, input }) => {
      return executeAuthorizedService(UpdatePostService, ctx, input);
    }),

  delete: permissionProcedure(ResourceEnum.enum.posts, FlagEnum.enum.WRITE)
    .meta({
      openapi: {
        method: "DELETE",
        path: "/admin/posts",
        tags: ["Posts"],
        summary: "Delete a post",
        description:
          "Removes a post from the database based on the provided input.",
        protect: true,
      },
    })
    .input(DeletePostSchema)
    .output(PostSchema)
    .mutation(({ ctx, input }) => {
      return executeAuthorizedService(DeletePostService, ctx, input);
    }),

  changeVisibility: permissionProcedure(
    ResourceEnum.enum.posts,
    FlagEnum.enum.WRITE,
  )
    .meta({
      openapi: {
        method: "PATCH",
        path: "/admin/posts/visibility",
        tags: ["Posts"],
        summary: "Change post visibility",
        description:
          "Updates the publish status or visibility of a specific post.",
        protect: true,
      },
    })
    .input(ChangePublishionForPostSchema)
    .output(PostSchema)
    .mutation(({ ctx, input }) => {
      return executeAuthorizedService(ChangePostVisilibityService, ctx, input);
    }),

  assignTags: permissionProcedure(ResourceEnum.enum.posts, FlagEnum.enum.WRITE)
    .meta({
      openapi: {
        method: "POST",
        path: "/admin/posts/tags",
        tags: ["Posts"],
        summary: "Assign tags to a post",
        description: "Links a set of tags to a specific post.",
        protect: true,
      },
    })
    .input(AssignTagsForPostSchema)
    .output(PostSchema)
    .mutation(({ ctx, input }) => {
      return executeAuthorizedService(AssignTagsForPostService, ctx, input);
    }),

  assignComments: permissionProcedure(
    ResourceEnum.enum.posts,
    FlagEnum.enum.WRITE,
  )
    .meta({
      openapi: {
        method: "POST",
        path: "/admin/posts/comments",
        tags: ["Posts"],
        summary: "Assign comments to a post",
        description:
          "Links or manages comments associated with a specific post.",
        protect: true,
      },
    })
    .input(AssignCommentsForPostSchema)
    .output(PostSchema)
    .mutation(({ ctx, input }) => {
      return executeAuthorizedService(AssignCommentsForPostService, ctx, input);
    }),

  assignReactions: permissionProcedure(
    ResourceEnum.enum.posts,
    FlagEnum.enum.WRITE,
  )
    .meta({
      openapi: {
        method: "POST",
        path: "/admin/posts/reactions",
        tags: ["Posts"],
        summary: "Assign reactions to a post",
        description: "Links a set of reactions to a specific post.",
        protect: true,
      },
    })
    .input(AssignReactionsForPostSchema)
    .output(PostSchema)
    .mutation(({ ctx, input }) => {
      return executeAuthorizedService(
        AssignReactionsForPostService,
        ctx,
        input,
      );
    }),
});
