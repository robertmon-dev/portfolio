import { BaseService } from '../service';
import type { User } from '@prisma/client';
import { UpdateUserInput } from '@portfolio/shared';
import { Prisma } from '@prisma/client';
import type { UserUpdating } from './types';

export class UpdateUserService extends BaseService implements UserUpdating {
  public async execute(input: UpdateUserInput): Promise<User> {
    const { id, ...data } = input;
    this.logger.info(`Updating user profile for ID: ${id}`);

    const updateData: Prisma.UserUpdateInput = {
      ...data,
      socials: data.socials === null ? Prisma.DbNull : (data.socials as Prisma.InputJsonValue)
    };

    const updated = await this.db.user.update({
      where: { id },
      data: updateData
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
