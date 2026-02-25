import { BaseService } from '../service';
import type { GetUserInput } from '@portfolio/shared';
import { Prisma } from '@prisma/client';
import { UserRetrieving } from './types';

export class GetUserService extends BaseService implements UserRetrieving {
  public async execute(input: GetUserInput) {
    const { id, email, username } = input;

    const cacheKey = `user:profile:${id || email || username}`;

    return this.cache.wrap(cacheKey, 3600, async () => {
      this.logger.debug(`Fetching user profile: ${JSON.stringify(input)} (cache miss)`);

      const where: Prisma.UserWhereUniqueInput = id
        ? { id }
        : email
          ? { email }
          : { username: username! };

      return await this.db.user.findUnique({
        where,
        include: {
          _count: {
            select: { VerificationCode: true }
          }
        }
      });
    });
  }
}
