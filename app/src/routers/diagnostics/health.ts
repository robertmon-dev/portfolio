import { z } from "zod";
import { router } from "../../trpc/init";
import { publicProcedure } from "../../trpc/procedures/public";
import { HealthResponseSchema } from "@portfolio/shared";
import { HealthService } from "../../services/health/health";
import { executeService } from "../../trpc/executers/base";

export const diagnosticsRouter = router({
  check: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/diagnostics/check",
        tags: ["Diagnostics"],
        summary: "Check application health status",
        description:
          "Returns information about server health, database connectivity, and Redis cache status.",
      },
    })
    .input(z.object({}))
    .output(HealthResponseSchema)
    .query(async ({ ctx }) => executeService(HealthService, ctx, undefined)),
});
