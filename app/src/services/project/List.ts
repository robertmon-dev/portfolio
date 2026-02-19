import { Database } from '../../../core/database/database';

interface ListProjectsOptions {
  onlyVisible?: boolean;
  onlyFeatured?: boolean;
}

export class ListProjectsService {
  private db = Database.getInstance();

  public async execute(options: ListProjectsOptions = {}) {
    const where: any = {};

    if (options.onlyVisible) {
      where.isVisible = true;
    }
    if (options.onlyFeatured) {
      where.isFeatured = true;
    }

    return await this.db.client.project.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        techStack: true,
      }
    });
  }
}
