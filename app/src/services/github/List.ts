import { BaseService } from '../service';

export class ListGithubReposService extends BaseService {
  public async execute() {
    const cacheKey = 'github:repos:list:all';

    return this.cache.wrap(cacheKey, 3600, async () => {
      this.logger.debug('Fetching github repos from database (cache miss)');

      return await this.db.githubRepo.findMany({
        orderBy: {
          stars: 'desc'
        },
        include: {
          project: {
            select: {
              title: true,
              id: true
            }
          }
        }
      });
    });
  }
}
