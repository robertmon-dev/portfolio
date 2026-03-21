import { z } from "zod";
import { router } from "../../trpc/init";
import { protectedProcedure } from "../../trpc/procedures/private";
import {
  UserProfileSchema,
  GetUserInputSchema,
  ListUsersInputSchema,
  UpdateUserInputSchema,
  DeleteUserInputSchema,
  CreateUserInputSchema,
} from "@portfolio/shared";
import { GetUserService } from "../../services/user/Get";
import { ListUsersService } from "../../services/user/List";
import { UpdateUserService } from "../../services/user/Update";
import { DeleteUserService } from "../../services/user/Delete";
import { CreateUserService } from "../../services/user/Create";
import { executeService } from "../../trpc/executers/base";

export const usersRouter = router({
  create: protectedProcedure
    .input(CreateUserInputSchema)
    .output(UserProfileSchema)
    .mutation(async ({ ctx, input }) =>
      executeService(CreateUserService, ctx, input),
    ),

  list: protectedProcedure
    .input(ListUsersInputSchema)
    .output(z.array(UserProfileSchema))
    .query(async ({ ctx, input }) =>
      executeService(ListUsersService, ctx, input),
    ),

  get: protectedProcedure
    .input(GetUserInputSchema)
    .output(UserProfileSchema)
    .query(async ({ ctx, input }) =>
      executeService(GetUserService, ctx, input),
    ),

  update: protectedProcedure
    .input(UpdateUserInputSchema)
    .output(UserProfileSchema)
    .mutation(async ({ ctx, input }) =>
      executeService(UpdateUserService, ctx, input),
    ),

  delete: protectedProcedure
    .input(DeleteUserInputSchema)
    .output(z.void())
    .mutation(async ({ ctx, input }) =>
      executeService(DeleteUserService, ctx, input),
    ),
});
