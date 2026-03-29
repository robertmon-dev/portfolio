import { z } from "zod";
import { router } from "../../trpc/init";
import { publicProcedure } from "../../trpc/procedures/public";
import { UserPublicSchema } from "@portfolio/shared";
import { GetPublicProfileService } from "../../services/user/Public";
import { executeService } from "../../trpc/executers/base";

export const usersRouter = router({
  get: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/profile",
        tags: ["Public"],
        summary: "Get portfolio owner profile",
        description:
          "Retrieves public information about the portfolio owner, including bio, headline, and social links. Data is cached for high performance.",
        protect: false,
      },
    })
    .input(z.void())
    .output(UserPublicSchema)
    .query(async ({ ctx }) =>
      executeService(GetPublicProfileService, ctx, undefined),
    ),
});
