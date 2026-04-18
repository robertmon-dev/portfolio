import { describe, it, expect } from "vitest";
import { useServiceTest } from "../../../mocks/core";
import { createFakeExperience } from "./utils";
import { GetExperienceService } from "../../../services/experience/Get";

describe("GetExperienceService", async () => {
  const ctx = useServiceTest(GetExperienceService);

  it("Shall get persisted records", async () => {
    const persistedExperience = createFakeExperience(1)[0];
    ctx.mocks.prisma.experience.findUnique.mockResolvedValue(
      persistedExperience,
    );

    await ctx.service.execute(persistedExperience.id);

    expect(ctx.mocks.prisma.experience.findUnique).toHaveBeenCalledWith({
      where: { id: persistedExperience.id },
    });
    expect(ctx.mocks.logger.debug).toHaveBeenCalledOnce();
    expect(ctx.mocks.cache.wrap).toHaveBeenCalled();
  });
});
