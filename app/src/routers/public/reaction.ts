import z from "zod";
import {
  ListReactionsInputSchema,
  ListReactionsOutputSchema,
  ReactionSchema,
  zSafeArray,
  zUuid,
} from "@portfolio/shared";
import { publicProcedure } from "../../trpc/procedures/public";
import { router } from "../../trpc/init";
import { executeService } from "../../trpc/executers/base";
import { GetReactionService } from "../../services/reaction/Get";
import { ListReactionsService } from "../../services/reaction/List";
import { ListReactionsServiceInput } from "../../services/reaction/types";
import { ListReactionsByPostService } from "../../services/reaction/ListByPost";
import { ListReactionsByCommentService } from "../../services/reaction/ListByComment";

export const reactionsRouter = router({
  getById: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/reactions/{id}",
        tags: ["Reactions"],
        summary: "Get reaction by ID",
        description:
          "Retrieves detailed information about a specific reaction using its unique UUID.",
        protect: false,
      },
    })
    .input(z.object({ id: zUuid }))
    .output(ReactionSchema)
    .query(async ({ ctx, input }) => {
      return executeService(GetReactionService, ctx, input.id);
    }),

  list: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/reactions",
        tags: ["Reactions"],
        summary: "List all reactions",
        description:
          "Retrieves a paginated list of active reactions based on provided filters.",
        protect: false,
      },
    })
    .input(ListReactionsInputSchema)
    .output(ListReactionsOutputSchema)
    .query(async ({ ctx, input }) => {
      return executeService(ListReactionsService, ctx, {
        ...input,
        includeDeleted: false,
      } as ListReactionsServiceInput);
    }),

  listByPost: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/reactions/post/{id}",
        tags: ["Reactions"],
        summary: "List reactions by post",
        description:
          "Fetches all reactions associated with a specific post ID.",
        protect: false,
      },
    })
    .input(z.object({ id: zUuid }))
    .output(zSafeArray(ReactionSchema))
    .query(async ({ ctx, input }) => {
      return executeService(ListReactionsByPostService, ctx, input.id);
    }),

  listByComment: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/reactions/comment/{id}",
        tags: ["Reactions"],
        summary: "List reactions by comment",
        description:
          "Fetches all reactions associated with a specific comment ID.",
        protect: false,
      },
    })
    .input(z.object({ id: zUuid }))
    .output(zSafeArray(ReactionSchema))
    .query(async ({ ctx, input }) => {
      return executeService(ListReactionsByCommentService, ctx, input.id);
    }),
});
