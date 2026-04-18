import { describe, it, expect } from "vitest";
import { useServiceTest } from "../../../mocks/core";
import { createFakeExperience } from "./utils";
import { ExperienceSchema } from "@portfolio/shared";
import { UpdateExperienceService } from "../../../services/experience/Update";

describe("UpdateExperienceService", async () => {
  const ctx = useServiceTest(UpdateExperienceService);

  it("Shall properly update persisted record", async () => {
    const persisted = createFakeExperience(1)[0];
    const { id, ...data } = persisted;

    ctx.mocks.prisma.experience.update.mockResolvedValue(persisted);
    await ctx.service.execute(persisted);

    expect(ctx.mocks.prisma.experience.update).toHaveBeenCalledWith({
      where: { id },
      data,
    });
    expect(ctx.mocks.logger.info).toHaveBeenCalledOnce();
    expect(ctx.mocks.cache.del).toHaveBeenCalledTimes(2);
  });

  it("Shall returns parsable result", async () => {
    const persisted = createFakeExperience(1)[0];

    ctx.mocks.prisma.experience.update.mockResolvedValue(persisted);

    const updated = await ctx.service.execute(persisted);
    const result = ExperienceSchema.parse(updated);
    expect(result).toHaveProperty("id");
    expect(result.id).toBe(persisted.id);
  });
});
