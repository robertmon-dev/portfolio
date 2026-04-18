import { z } from "zod";
import { describe, it, expect } from "vitest";
import { useServiceTest } from "../../../mocks/core";
import { createFakeExperience } from "./utils";
import { ExperienceSchema } from "@portfolio/shared";
import { ListExperienceService } from "../../../services/experience/List";

describe("ListExperienceService", async () => {
  const ctx = useServiceTest(ListExperienceService);

  it("Shall properly fetch persisted records", async () => {
    const persistedExperience = createFakeExperience(21);

    ctx.mocks.prisma.experience.findMany.mockResolvedValue(persistedExperience);

    await ctx.service.execute();

    expect(ctx.mocks.prisma.experience.findMany).toHaveBeenCalledWith({
      orderBy: { startDate: "desc" },
    });

    expect(ctx.mocks.logger.debug).toHaveBeenCalledOnce();
  });

  it("Shall properly return multiple experience records that are parsable", async () => {
    const persistedExperience = createFakeExperience(21);
    ctx.mocks.prisma.experience.findMany.mockResolvedValue(persistedExperience);

    const experiences = await ctx.service.execute();
    const testableSchema = z.array(ExperienceSchema);

    const result = testableSchema.parse(experiences);
    expect(result.length).toEqual(21);
    expect(result.at(0)).toHaveProperty("id");
  });
});
