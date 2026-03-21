import { TRPCError } from "@trpc/server";
import { BaseService } from "../service";
import {
  type GetUserInput,
  type UserProfile,
  UserProfileSchema,
} from "@portfolio/shared";
import { Prisma } from "@prisma/client";
import { UserRetrieving } from "./types";
import { userProfileQuery } from "./queries";

export class GetUserService extends BaseService implements UserRetrieving {
  public async execute(input: GetUserInput): Promise<UserProfile> {
    const { id, email, username } = input;

    const cacheKey = `user:profile:${id || email || username}`;

    const user = await this.cache.wrap(cacheKey, 3600, async () => {
      this.logger.debug(
        `Fetching user profile: ${JSON.stringify(input)} (cache miss)`,
      );

      const where: Prisma.UserWhereUniqueInput = id
        ? { id }
        : email
          ? { email }
          : { username: username! };

      const result = await this.db.user.findUnique({
        where,
        ...userProfileQuery,
      });

      return result;
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User profile not found.",
      });
    }

    return UserProfileSchema.parse(user);
  }
}
