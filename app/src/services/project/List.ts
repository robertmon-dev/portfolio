import { Prisma } from '@prisma/client';
import { BaseService } from '../service';
import type { ListProjectsOptions } from '@portfolio/shared';
import type { ProjectListing } from './types';

export class ListProjectsService extends BaseService implements ProjectListing {
  public async execute(options: ListProjectsOptions) {
    const where: Prisma.ProjectWhereInput = {};
    if (options.onlyVisible) where.isVisible = true;
    if (options.onlyFeatured) where.isFeatured = true;

    const cacheKey = `projects:list:${JSON.stringify(options)}`;

    return this.cache.wrap(cacheKey, 600, async () => {
      this.logger.debug('Fetching and mapping projects');

      return await this.db.project.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        include: {
          techStack: true,
          githubRepo: true,
          gallery: true,
        }
      });
    });
  }
}
