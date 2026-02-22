import { BaseService } from '../service';
import type { DeleteUserInput } from '@portfolio/shared';

export class DeleteUserService extends BaseService {
  public async execute(input: DeleteUserInput): Promise<void> {
    const { id } = input;

    this.logger.warn(`Critical action: Attempting to remove user ID ${id}`);

    try {
      const user = await this.db.user.delete({
        where: { id }
      });

      await Promise.all([
        this.cache.del('users:list:all'),
        this.cache.del(`user:profile:${id}`),
        this.cache.del(`user:profile:${user.email}`),
        this.cache.del(`user:profile:${user.username}`)
      ]);

      this.logger.info(`User ${id} (${user.email}) permanently removed and cache invalidated.`);
    } catch (error) {
      this.logger.error(`Error deleting user ${id}. It might not exist or there are foreign key constraints.`, error);
      throw error;
    }
  }
}
