import { Database } from '../../core/database/database';
import { Logger } from '../../core/logger/logger';
import type { Prisma } from '@prisma/client';

export interface UpdateProjectInput extends Omit<Prisma.ProjectUpdateInput, 'techStack' | 'gallery' | 'githubRepo'> {
  techStackIds?: string[];
  githubRepoId?: string | null;
}

export class UpdateProjectService {
  private db = Database.getInstance();
  private logger = new Logger('UpdateProjectService');

  public async execute(id: string, data: UpdateProjectInput) {
    this.logger.info(`Updating project: ${id}`);

    const { techStackIds, githubRepoId, ...rest } = data;

    return await this.db.client.project.update({
      where: { id },
      data: {
        ...rest,

        techStack: techStackIds ? {
          set: techStackIds.map(id => ({ id }))
        } : undefined,

        githubRepo: githubRepoId === null
          ? { disconnect: true }
          : githubRepoId
            ? { connect: { id: githubRepoId } }
            : undefined
      }
    });
  }
}
