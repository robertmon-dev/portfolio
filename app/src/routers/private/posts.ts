import { router } from "../../trpc/init";
import { permissionProcedure } from "../../trpc/procedures/permission";
import {
  CreatePostSchema,
  DeletePostSchema,
  PostSchema,
  UpdatePostSchema,
} from "@portfolio/shared";
import { ResourceEnum, FlagEnum } from "@portfolio/shared";
import { executeAuthorizedService } from "../../trpc/executers/base";
import { CreatePostService } from "../../services/post/Create";
import { UpdatePostService } from "../../services/post/Update";
import { DeletePostService } from "../../services/post/Delete";

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
});
