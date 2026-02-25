import { BaseService } from '../service';
import type { ListUsersInput } from '@portfolio/shared';
import { Prisma } from '@prisma/client';
import type { UserListing } from './types';


export class ListUsersService extends BaseService implements UserListing {
  public async execute(input: ListUsersInput) {
    const cacheKey = `users:list:${JSON.stringify(input || 'all')}`;

    return this.cache.wrap(cacheKey, 1800, async () => {
      this.logger.debug(`Fetching users list from database with input: ${JSON.stringify(input)}`);

      const where: Prisma.UserWhereInput = {
        AND: [
          input?.role ? { role: input.role } : {},
          input?.search ? {
            OR: [
              { email: { contains: input.search, mode: 'insensitive' } },
              { username: { contains: input.search, mode: 'insensitive' } },
              { name: { contains: input.search, mode: 'insensitive' } }
            ]
          } : {}
        ]
      };

      return await this.db.user.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: input?.limit,
        skip: input?.offset,
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
          createdAt: true,
          twoFactorEnabled: true,
          avatarUrl: true,
          name: true
        }
      });
    });
  }
}
