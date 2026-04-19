import { describe, expect, it } from "vitest";
import { useServiceTest } from "../../../mocks/core";
import { GetGithubStatsService } from "../../../services/github/Get";
import { createFakeGithubStats } from "./utils";
import { githubStatsWithDeepRelationsQuery } from "../../../services/github/queries";
import { GithubStatsSchema } from "@portfolio/shared";

describe("GetGithubStatsService", async () => {
  const ctx = useServiceTest(GetGithubStatsService);

  it("Shall properly fetch data and call redis cache", async () => {
    const persistedStats = createFakeGithubStats(1)[0];

    ctx.mocks.prisma.githubStats.findUnique.mockResolvedValue(persistedStats);
    expect(ctx.mocks.cache.get).toHaveBeenCalledWith(
      `github:stats:${ctx.mocks.settings.NICKNAME}`,
    );
    expect(ctx.mocks.prisma.githubStats.findUnique).toHaveBeenCalledWith({
      where: { username: ctx.mocks.settings.NICKNAME },
      ...githubStatsWithDeepRelationsQuery,
    });

    const result = await ctx.service.execute(ctx.mocks.settings.NICKNAME);

    const parsed = GithubStatsSchema.parse(result);
    expect(parsed).toBeTypeOf(typeof GithubStatsSchema);
  });
});
