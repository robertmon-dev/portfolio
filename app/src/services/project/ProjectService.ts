import { Database } from '../../core/database/database';
import { Logger } from '../../core/logger/logger';
import { Project } from '@portfolio/shared';

export class ProjectService {
  private static instance: ProjectService;
  private db: Database;
  private logger: Logger;

  private constructor() {
    this.logger = new Logger('ProjectService');
    this.db = Database.getInstance();
  }

  public static getInstance(): ProjectService {
    if (!ProjectService.instance) {
      ProjectService.instance = new ProjectService();
    }

    return ProjectService.instance;
  }

  public async getAllVisible(): Promise<Project[]> {
    this.logger.debug('Fetching all visible projects');

    const projects = await this.db.client.project.findMany({
      where: { isVisible: true },
      include: {
        techStack: true,
        gallery: {
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return projects as Project[];
  }

  public async getBySlug(slug: string): Promise<Project | null> {
    this.logger.debug(`Fetching project by slug: ${slug}`);

    const project = await this.db.client.project.findUnique({
      where: { slug },
      include: {
        techStack: true,
        gallery: {
          orderBy: { order: 'asc' }
        }
      }
    });

    return (project as Project) || null;
  }
}
