import { z } from "zod";
import { router } from "../../trpc/init";
import { utilityProcedure } from "src/trpc/procedures/utility";
import { HealthResponseSchema } from "@portfolio/shared";
import { HealthService } from "../../services/health/health";
import { executeService } from "../../trpc/executers/base";

export const diagnosticsRouter = router({
  check: utilityProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/diagnostics/check",
        tags: ["Diagnostics"],
        summary: "Check application health status",
        description:
          "Returns information about server health, database connectivity, and Redis cache status.",
        protect: true,
      },
    })
    .input(z.object({}))
    .output(HealthResponseSchema)
    .query(({ ctx }) => executeService(HealthService, ctx, undefined)),
});
