import z from "zod";
import { permissionProcedure } from "src/trpc/procedures/permission";
import { router } from "../../trpc/init";
import {
  ResourceEnum,
  FlagEnum,
  CreateReactionSchema,
  ReactionSchema,
  UpdateReactionSchema,
  ListReactionsInputSchema,
  ListReactionsOutputSchema,
  zSafeArray,
  zUuid,
} from "@portfolio/shared";
import {
  executeAuthorizedService,
  executeService,
} from "../../trpc/executers/base";
import { CreateReactionService } from "../../services/reaction/Create";
import { UpdateReactionService } from "../../services/reaction/Update";
import { DeleteReactionsService } from "../../services/reaction/Delete";
import { ListReactionsService } from "../../services/reaction/List";
import type { ListReactionsServiceInput } from "../../services/reaction/types";

export const reactionsPrivateRouter = router({
  create: permissionProcedure(ResourceEnum.enum.reactions, FlagEnum.enum.WRITE)
    .meta({
      openapi: {
        method: "POST",
        path: "/reactions",
        tags: ["Reactions"],
        summary: "Create a new reaction",
        description:
          "Creates a new reaction for a post or comment. Requires WRITE permissions.",
        protect: true,
      },
    })
    .input(CreateReactionSchema)
    .output(ReactionSchema)
    .mutation(async ({ ctx, input }) => {
      return executeAuthorizedService(CreateReactionService, ctx, input);
    }),

  update: permissionProcedure(ResourceEnum.enum.reactions, FlagEnum.enum.WRITE)
    .meta({
      openapi: {
        method: "PATCH",
        path: "/reactions",
        tags: ["Reactions"],
        summary: "Update an existing reaction",
        description: "Updates reaction details. Requires WRITE permissions.",
        protect: true,
      },
    })
    .input(UpdateReactionSchema)
    .output(ReactionSchema)
    .mutation(async ({ ctx, input }) => {
      return executeAuthorizedService(UpdateReactionService, ctx, input);
    }),

  delete: permissionProcedure(ResourceEnum.enum.reactions, FlagEnum.enum.WRITE)
    .meta({
      openapi: {
        method: "DELETE",
        path: "/reactions",
        tags: ["Reactions"],
        summary: "Delete multiple reactions",
        description:
          "Removes reactions based on the provided list of UUIDs. Requires WRITE permissions.",
        protect: true,
      },
    })
    .input(z.object({ ids: zSafeArray(zUuid) }))
    .output(zSafeArray(ReactionSchema))
    .mutation(async ({ ctx, input }) => {
      return executeAuthorizedService(DeleteReactionsService, ctx, input.ids);
    }),

  list: permissionProcedure(ResourceEnum.enum.reactions, FlagEnum.enum.ADMIN)
    .meta({
      openapi: {
        method: "GET",
        path: "/reactions/admin",
        tags: ["Reactions"],
        summary: "List all reactions (Admin)",
        description:
          "Retrieves a complete list of reactions, including those marked as deleted. Requires ADMIN permissions.",
        protect: true,
      },
    })
    .input(ListReactionsInputSchema)
    .output(ListReactionsOutputSchema)
    .query(async ({ ctx, input }) => {
      return executeService(ListReactionsService, ctx, {
        ...input,
        includeDeleted: true,
      } as ListReactionsServiceInput);
    }),
});
