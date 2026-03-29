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
      select: { email: true, username: true, id: true },
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

    await this.invalidateUserCache(oldUser, updated);

    return UserProfileSchema.parse(updated);
  }
}
