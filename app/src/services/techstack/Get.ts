import { BaseService } from '../service';
import {
  TechStackWithRelationsSchema,
  type TechStackWithRelations,
} from '@portfolio/shared';
import type { TechStackRetrieving } from './types';

export class GetTechStackService extends BaseService implements TechStackRetrieving {
  public async execute(id: string): Promise<TechStackWithRelations | null> {
    const cacheKey = `techstack:id:${id}`;

    return this.cache.wrap(cacheKey, 3600, async () => {
      this.logger.debug(`Fetching Tech Stack: ${id} (cache miss)`);

      const techStack = await this.db.techStack.findUnique({
        where: { id },
        include: {
          projects: {
            select: {
              id: true,
              title: true,
              slug: true
            }
          }
        }
      });

      if (!techStack) return null;

      return TechStackWithRelationsSchema.parse(techStack);
    });
  }
}
