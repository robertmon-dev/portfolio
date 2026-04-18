import { describe, it, expect } from "vitest";
import { useServiceTest } from "../../../mocks/core";
import { createFakeExperience } from "./utils";
import { CreateExperienceService } from "../../../services/experience/Create";

describe("CreateExperienceService", async () => {
  const ctx = useServiceTest(CreateExperienceService);

  it("Shall properly create experience record in database", async () => {
    const experience = createFakeExperience(1)[0];

    ctx.mocks.prisma.experience.create.mockResolvedValue(experience);
    await ctx.service.execute({
      ...experience,
    });

    expect(ctx.mocks.prisma.experience.create).toHaveBeenCalledWith({
      data: { ...experience },
    });
    expect(ctx.mocks.cache.del).toHaveBeenCalledTimes(2);
  });
});
