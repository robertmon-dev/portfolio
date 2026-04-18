import { describe, it, expect } from "vitest";
import { useServiceTest } from "../../../mocks/core";
import { createFakeExperience } from "./utils";
import { DeleteExperienceService } from "../../../services/experience/Delete";

describe("DeleteExperienceService", async () => {
  const ctx = useServiceTest(DeleteExperienceService);

  it("Shall properly remove experience records", async () => {
    const experiences = createFakeExperience(20);
    const experiencesIds = experiences.map((experience) => experience.id);

    ctx.mocks.prisma.experience.deleteMany.mockResolvedValue(experiencesIds);
    await ctx.service.execute(experiencesIds);

    expect(ctx.mocks.prisma.experience.deleteMany).toHaveBeenCalledWith({
      where: {
        id: { in: experiencesIds },
      },
    });

    expect(ctx.mocks.cache.del).toHaveBeenCalledTimes(21);
  });
});
