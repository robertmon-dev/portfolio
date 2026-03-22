import { Prisma } from "@prisma/client";
import { BaseService } from "../service";
import {
  ProjectWithRelationsSchema,
  type ProjectWithRelations,
  type ListProjectsOptions,
} from "@portfolio/shared";
import { z } from "zod";
import type { ProjectListing } from "./types";
import { projectWithRelationsQuery } from "./queries";

export class ListProjectsService extends BaseService implements ProjectListing {
  public async execute(
    options: ListProjectsOptions,
  ): Promise<ProjectWithRelations[]> {
    const where: Prisma.ProjectWhereInput = {};
    if (options.onlyVisible) where.isVisible = true;
    if (options.onlyFeatured) where.isFeatured = true;

    const cacheKey = `projects:list:${JSON.stringify(options)}`;

    const data = await this.cache.wrap(cacheKey, 600, async () => {
      this.logger.debug("Fetching projects from database");

      return await this.db.project.findMany({
        where,
        orderBy: { createdAt: "desc" },
        ...projectWithRelationsQuery,
      });
    });

    return z.array(ProjectWithRelationsSchema).parse(data);
  }
}
