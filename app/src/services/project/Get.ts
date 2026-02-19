import { Database } from '../../core/database/database';
import { Logger } from '../../core/logger/logger';

export class GetProjectBySlugService {
  private db = Database.getInstance();
  private logger = new Logger('GetProjectBySlugService');

  public async execute(slug: string) {
    this.logger.debug(`Fetching project: ${slug}`);

    const project = await this.db.client.project.findUnique({
      where: { slug },
      include: {
        techStack: {
          orderBy: { name: 'asc' }
        },
        gallery: {
          orderBy: { order: 'asc' }
        },
        githubRepo: true,
      }
    });

    if (!project) return null;

    return project;
  }
}
