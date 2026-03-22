import { BaseService } from "../service";
import {
  UpdateUserInput,
  UserProfile,
  UserProfileSchema,
} from "@portfolio/shared";
import { Prisma } from "@prisma/client";
import type { UserUpdating } from "./types";
import { userProfileQuery } from "./queries";

export class UpdateUserService extends BaseService implements UserUpdating {
  public async execute(input: UpdateUserInput): Promise<UserProfile> {
    const { id, socials, role, ...data } = input;
    this.logger.info(`Updating user profile for ID: ${id}`);

    const oldUser = await this.db.user.findUnique({
      where: { id },
      select: { email: true, username: true },
    });

    const updated = await this.db.user.update({
      where: { id },
      data: {
        ...data,
        role,
        socials:
          socials === null ? Prisma.DbNull : (socials as Prisma.InputJsonValue),
      },
      ...userProfileQuery,
    });

    await Promise.all([
      this.cache.del("users:list:*"),
      this.cache.del("users:list:all"),
      this.cache.del(`user:profile:${id}`),
      this.cache.del(`user:profile:${oldUser?.email}`),
      this.cache.del(`user:profile:${oldUser?.username}`),
      this.cache.del(`user:profile:${updated.email}`),
      this.cache.del(`user:profile:${updated.username}`),
    ]);

    return UserProfileSchema.parse(updated);
  }
}
