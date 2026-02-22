import { BaseService } from '../service';
import type { Prisma, User } from '@prisma/client';

export class UpdateUserService extends BaseService {
  public async execute(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    this.logger.info(`Updating user profile for ID: ${id}`);

    const updated = await this.db.user.update({
      where: { id },
      data
    });

    await Promise.all([
      this.cache.del('users:list:all'),
      this.cache.del(`user:profile:${id}`),
      this.cache.del(`user:profile:${updated.email}`),
      this.cache.del(`user:profile:${updated.username}`)
    ]);

    this.logger.info(`User ${id} updated and cache cleared.`);
    return updated;
  }
}
