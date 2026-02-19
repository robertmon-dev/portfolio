import { Database } from '../../core/database/database';
import { Logger } from '../../core/logger/logger';
import type { Prisma } from '@prisma/client';

export interface CreateProjectInput extends Omit<Prisma.ProjectCreateInput, 'techStack' | 'gallery' | 'githubRepo'> {
  techStackIds?: string[];
  githubRepoId?: string;
}

export class CreateProjectService {
  private db = Database.getInstance();
  private logger = new Logger('CreateProjectService');

  public async execute(data: CreateProjectInput) {
    this.logger.info(`Creating project: ${data.title}`);

    const { techStackIds, githubRepoId, ...rest } = data;

    return await this.db.client.project.create({
      data: {
        ...rest,
        techStack: techStackIds ? {
          connect: techStackIds.map(id => ({ id }))
        } : undefined,

        githubRepo: githubRepoId ? {
          connect: { id: githubRepoId }
        } : undefined
      }
    });
  }
}
