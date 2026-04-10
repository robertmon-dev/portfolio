import { z } from "zod";
import { router } from "../../trpc/init";
import { permissionProcedure } from "../../trpc/procedures/permission";
import {
  UserProfileSchema,
  GetUserInputSchema,
  ListUsersInputSchema,
  UpdateUserInputSchema,
  DeleteUserInputSchema,
  CreateUserInputSchema,
  UpdateUserPermissionsInputSchema,
  FlagEnum,
  ResourceEnum,
} from "@portfolio/shared";
import { GetUserService } from "../../services/user/Get";
import { ListUsersService } from "../../services/user/List";
import { UpdateUserService } from "../../services/user/Update";
import { DeleteUserService } from "../../services/user/Delete";
import { CreateUserService } from "../../services/user/Create";
import { UpdateUserPermissionsService } from "../../services/user/UpdatePermission";
import { executeService } from "../../trpc/executers/base";

export const usersPrivateRouter = router({
  create: permissionProcedure(ResourceEnum.enum.user, FlagEnum.enum.WRITE)
    .meta({
      openapi: {
        method: "POST",
        path: "/admin/users",
        tags: ["Users"],
        summary: "Create a new user",
        description: "Creates a new administrative user for the portfolio CMS.",
        protect: true,
      },
    })
    .input(CreateUserInputSchema)
    .output(UserProfileSchema)
    .mutation(({ ctx, input }) =>
      executeService(CreateUserService, ctx, input),
    ),

  list: permissionProcedure(ResourceEnum.enum.user, FlagEnum.enum.WRITE)
    .meta({
      openapi: {
        method: "GET",
        path: "/admin/users",
        tags: ["Users"],
        summary: "List all users",
        description:
          "Returns a list of users with pagination and filtering options.",
        protect: true,
      },
    })
    .input(ListUsersInputSchema)
    .output(z.array(UserProfileSchema))
    .query(({ ctx, input }) => executeService(ListUsersService, ctx, input)),

  get: permissionProcedure(ResourceEnum.enum.user, FlagEnum.enum.READ)
    .meta({
      openapi: {
        method: "GET",
        path: "/admin/users/detail",
        tags: ["Users"],
        summary: "Get user by ID",
        description: "Returns full profile information for a specific user.",
        protect: true,
      },
    })
    .input(GetUserInputSchema)
    .output(UserProfileSchema)
    .query(({ ctx, input }) => executeService(GetUserService, ctx, input)),

  update: permissionProcedure(ResourceEnum.enum.user, FlagEnum.enum.WRITE)
    .meta({
      openapi: {
        method: "PATCH",
        path: "/admin/users",
        tags: ["Users"],
        summary: "Update user profile",
        description: "Updates basic information like name or email for a user.",
        protect: true,
      },
    })
    .input(UpdateUserInputSchema)
    .output(UserProfileSchema)
    .mutation(({ ctx, input }) =>
      executeService(UpdateUserService, ctx, input),
    ),

  updatePermissions: permissionProcedure(
    ResourceEnum.enum.user,
    FlagEnum.enum.WRITE,
  )
    .meta({
      openapi: {
        method: "PATCH",
        path: "/admin/users/permissions",
        tags: ["Users"],
        summary: "Update user permissions",
        description:
          "Directly modifies the roles and permissions assigned to a user.",
        protect: true,
      },
    })
    .input(UpdateUserPermissionsInputSchema)
    .output(UserProfileSchema)
    .mutation(({ ctx, input }) =>
      executeService(UpdateUserPermissionsService, ctx, input),
    ),

  delete: permissionProcedure(ResourceEnum.enum.user, FlagEnum.enum.WRITE)
    .meta({
      openapi: {
        method: "DELETE",
        path: "/admin/users",
        tags: ["Users"],
        summary: "Delete user",
        description:
          "Permanently removes a user account and their access rights.",
        protect: true,
      },
    })
    .input(DeleteUserInputSchema)
    .output(z.void())
    .mutation(({ ctx, input }) =>
      executeService(DeleteUserService, ctx, input),
    ),
});
