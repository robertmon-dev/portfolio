import { TRPCError } from "@trpc/server";
import { BaseService } from "../service";
import {
  type UpdateUserPermissionsInput,
  type UserProfile,
  UserProfileSchema,
} from "@portfolio/shared";
import { userProfileQuery } from "./queries";

export class UpdateUserPermissionsService extends BaseService {
  public async execute(
    input: UpdateUserPermissionsInput,
  ): Promise<UserProfile> {
    const { id, permissions } = input;

    this.logger.info(`Updating permissions for user ${id}`);

    const userExists = await this.db.user.findUnique({ where: { id } });
    if (!userExists) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    await this.db.$transaction(async (tx) => {
      await tx.userPermission.deleteMany({
        where: { userId: id },
      });

      if (permissions.length > 0) {
        await tx.userPermission.createMany({
          data: permissions.map((p) => ({
            userId: id,
            resource: p.resource,
            flags: p.flags,
          })),
        });
      }
    });

    const updated = await this.db.user.findUniqueOrThrow({
      where: { id },
      ...userProfileQuery,
    });

    await Promise.all([
      this.cache.del("users:list:all"),
      this.cache.del("users:list:*"),
      this.cache.del(`user:profile:${id}`),
      this.cache.del(`user:profile:${updated.email}`),
      this.cache.del(`user:profile:${updated.username}`),
    ]);

    this.logger.info(`Successfully updated permissions for user ${id}`);

    return UserProfileSchema.parse(updated);
  }
}
