import { describe, it, expect } from "vitest";
import { UpdateCommitService } from "../../../services/commits/Update";
import { useServiceTest } from "../../../mocks/core";
import { createFakeCommitWithRepo } from "./utils";

describe("UpdateCommitService", () => {
  const ctx = useServiceTest(UpdateCommitService);

  it("should successfully update a commit and return it", async () => {
    const input = {
      id: "c1",
      message: "Random message",
      author: "Robert",
    };

    const mockUpdatedCommit = await createFakeCommitWithRepo({
      id: "c1",
      message: "Random message",
    });

    ctx.mocks.prisma.githubCommit.update.mockResolvedValue(mockUpdatedCommit);

    const result = await ctx.service.execute(input);

    expect(result).toEqual(mockUpdatedCommit);
    expect(ctx.mocks.prisma.githubCommit.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: "c1" },
        data: { message: "Random message", author: "Robert" },
      }),
    );
  });

  it("should throw an error if commit does not exist (Prisma error)", async () => {
    const input = { id: "non-existent", message: "Cokolwiek" };
    const prismaError = new Error("Record to update not found.");

    ctx.mocks.prisma.githubCommit.update.mockRejectedValue(prismaError);

    await expect(ctx.service.execute(input)).rejects.toThrow(/not found/i);
  });
});
