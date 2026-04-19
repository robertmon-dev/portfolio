import { describe, expect, it, type Mock } from "vitest";
import { useServiceTest } from "../../../mocks/core";
import { HealthService } from "../../../services/health/health";
import { HealthResponseSchema } from "@portfolio/shared";

describe("HealthCheckService", async () => {
  let ctx = useServiceTest(HealthService);

  it("Properly pings used services", async () => {
    const result = await ctx.service.execute();

    expect(ctx.mocks.cache.get).toHaveBeenCalledWith("health-check-ping");
    expect(ctx.mocks.prisma.$queryRaw).toHaveBeenCalledWith(["SELECT 1"]);

    const parsed = HealthResponseSchema.parse(result);
    expect(parsed).toBeTypeOf(typeof HealthResponseSchema);
    expect(parsed).toHaveProperty("status");
  });

  it("Handles properly throws on postgres connection", async () => {
    ctx.mocks.prisma.$queryRaw.mockThrow(new Error("test-prisma-message"));

    const result = await ctx.service.execute();

    expect(ctx.mocks.logger.error).toHaveBeenCalledWith(
      "Health check: Database connection failed",
      new Error("test-prisma-message"),
    );
    expect(result.database.message).toBe("test-prisma-message");
    expect(result.database.connected).toBe(false);
  });

  ctx = useServiceTest(HealthService, true);

  it("Handles properly throws on redis connection", async () => {
    (ctx.mocks.cache.get as Mock).mockThrow(new Error("test-redis-message"));

    const result = await ctx.service.execute();

    expect(result.redis.connected).toBe(false);
  });
});
