import { BaseService } from '../service';
import type { TechStackDeleting } from './types';

export class DeleteTechStackService extends BaseService implements TechStackDeleting {
  public async execute(ids: string[]): Promise<void> {
    this.logger.warn(`Attempting to hard-delete Tech Stacks: ${ids.join(', ')}`);

    try {
      const result = await this.db.techStack.deleteMany({
        where: {
          id: { in: ids }
        }
      });

      await Promise.all([
        this.cache.del('techstack:list:*'),
        this.cache.del('projects:list:*')
      ]);

      this.logger.info(`Successfully hard-deleted ${result.count} Tech Stack(s) and invalidated cache.`);
    } catch (error) {
      this.logger.error(`Failed to hard-delete tech stacks: ${ids.join(', ')}.`, error);
      throw error;
    }
  }
}
