import { describe, it, expect } from "vitest";
import { ListCommitsService } from "../../commits/List";
import { useServiceTest, MOCK_UUID } from "../../../mocks/core";
import { createFakeCommits } from "./utils";

describe("ListCommitsService", () => {
  const ctx = useServiceTest(ListCommitsService);

  it("should return a list of commits and no nextCursor when items < limit", async () => {
    const limit = 5;
    const fakeItems = createFakeCommits(3);

    ctx.mocks.prisma.githubCommit.findMany.mockResolvedValue(fakeItems);

    const result = await ctx.service.execute({ limit });

    expect(result.items).toHaveLength(3);
    expect(result.nextCursor).toBeUndefined();
    expect(ctx.mocks.prisma.githubCommit.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        take: limit + 1,
        orderBy: { date: "desc" },
      }),
    );
  });

  it("should return nextCursor when items > limit", async () => {
    const limit = 2;
    const fakeItems = createFakeCommits(3);
    const expectedNextCursor = fakeItems[2].id;

    ctx.mocks.prisma.githubCommit.findMany.mockResolvedValue(fakeItems);

    const result = await ctx.service.execute({ limit });

    expect(result.items).toHaveLength(2);
    expect(result.nextCursor).toBe(expectedNextCursor);
    expect(result.items[0].id).toBe(fakeItems[0].id);
  });

  it("should correctly use cursor in prisma query if provided", async () => {
    const limit = 10;
    const cursor = MOCK_UUID;

    ctx.mocks.prisma.githubCommit.findMany.mockResolvedValue([]);

    await ctx.service.execute({ limit, cursor });

    expect(ctx.mocks.prisma.githubCommit.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        cursor: { id: cursor },
        take: limit + 1,
      }),
    );
  });

  it("should validate the output array using Zod", async () => {
    const fakeItems = createFakeCommits(1);
    // @ts-expect-error
    delete fakeItems[0].message;

    ctx.mocks.prisma.githubCommit.findMany.mockResolvedValue(fakeItems);

    await expect(ctx.service.execute({ limit: 10 })).rejects.toThrow();
  });
});
