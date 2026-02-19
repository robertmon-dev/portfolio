import { Database } from '../../core/database/database';
import type { GithubRepo } from '@prisma/client';

export class ListGithubReposService {
  private db = Database.getInstance();

  public async execute(): Promise<GithubRepo[]> {
    return await this.db.client.githubRepo.findMany({
      orderBy: { stars: 'desc' },
      include: {
        project: { select: { title: true, id: true } }
      }
    });
  }
}
