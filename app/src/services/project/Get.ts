import { BaseService } from "../service";
import {
  ProjectWithRelationsSchema,
  type ProjectWithRelations,
} from "@portfolio/shared";
import { projectWithOrderedRelationsQuery } from "./queries";
import type { ProjectRetrieving } from "./types";

export class GetProjectBySlugService
  extends BaseService
  implements ProjectRetrieving
{
  public async execute(slug: string): Promise<ProjectWithRelations | null> {
    const cacheKey = `project:slug:${slug}`;

    const data = await this.cache.wrap(cacheKey, 300, async () => {
      this.logger.debug(`Fetching project by slug: ${slug}`);

      return await this.db.project.findUnique({
        where: { slug },
        ...projectWithOrderedRelationsQuery,
      });
    });

    if (!data) return null;

    return ProjectWithRelationsSchema.parse(data);
  }
}
