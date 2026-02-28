import { BaseService } from '../service';
import {
  TechStackSchema,
  type TechStack,
  type CreateTechStackInput,
} from '@portfolio/shared';
import type { TechStackCreating } from './types';

export class CreateTechStackService extends BaseService implements TechStackCreating {
  public async execute(data: CreateTechStackInput): Promise<TechStack> {
    this.logger.info(`Creating tech stack: ${data.name}`);

    const created = await this.db.techStack.create({
      data
    });

    await this.cache.del('techstack:list:*');

    return TechStackSchema.parse(created);
  }
}
