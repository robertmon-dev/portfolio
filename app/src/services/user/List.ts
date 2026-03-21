import { z } from "zod";
import { BaseService } from "../service";
import {
  type ListUsersInput,
  type UserProfile,
  UserProfileSchema,
} from "@portfolio/shared";
import { Prisma } from "@prisma/client";
import type { UserListing } from "./types";

export class ListUsersService extends BaseService implements UserListing {
  public async execute(input: ListUsersInput): Promise<UserProfile[]> {
    const cacheKey = `users:list:${JSON.stringify(input || "all")}`;

    return this.cache.wrap(cacheKey, 1800, async () => {
      this.logger.debug(
        `Fetching users list from database with input: ${JSON.stringify(input)}`,
      );

      const where: Prisma.UserWhereInput = {
        AND: [
          input?.role ? { role: input.role } : {},
          input?.search
            ? {
                OR: [
                  { email: { contains: input.search, mode: "insensitive" } },
                  { username: { contains: input.search, mode: "insensitive" } },
                  { name: { contains: input.search, mode: "insensitive" } },
                ],
              }
            : {},
        ],
      };

      const users = await this.db.user.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: input?.limit,
        skip: input?.offset,

        select: {
          id: true,
          email: true,
          username: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          twoFactorEnabled: true,
          avatarUrl: true,
          name: true,
          headline: true,
          bio: true,
          socials: true,
          permissions: {
            select: {
              resource: true,
              flags: true,
            },
          },
        },
      });

      return z.array(UserProfileSchema).parse(users);
    });
  }
}
