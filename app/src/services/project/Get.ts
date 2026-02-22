import { BaseService } from '../service';
import type { ProjectRetrieving } from './types';

export class GetProjectBySlugService extends BaseService implements ProjectRetrieving {
  public async execute(slug: string) {
    const cacheKey = `project:slug:${slug}`;

    return this.cache.wrap(cacheKey, 300, async () => {
      this.logger.debug(`Fetching project by slug: ${slug}`);

      return await this.db.project.findUnique({
        where: { slug },
        include: {
          techStack: { orderBy: { name: 'asc' } },
          gallery: { orderBy: { order: 'asc' } },
          githubRepo: true,
        }
      });
    });
  }
}
