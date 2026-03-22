import { z } from "zod";
import { router } from "../../trpc/init";
import { publicProcedure } from "../../trpc/procedures/public";
import { HealthResponseSchema } from "@portfolio/shared";
import { HealthService } from "../../services/health/health";
import { executeService } from "../../trpc/executers/base";

export const diagnosticsRouter = router({
  check: publicProcedure
    .input(z.void())
    .output(HealthResponseSchema)
    .query(async ({ ctx }) => executeService(HealthService, ctx, undefined)),
});
