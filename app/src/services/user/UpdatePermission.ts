import { BaseService } from "../service";
import {
  type UpdateUserPermissionsInput,
  type UserProfile,
  UserProfileSchema,
} from "@portfolio/shared";
import { userProfileQuery } from "./queries";
import { PermittingUsers } from "./types";

export class UpdateUserPermissionsService
  extends BaseService
  implements PermittingUsers
{
  public async execute(
    input: UpdateUserPermissionsInput,
  ): Promise<UserProfile> {
    const { id, permissions } = input;
    this.logger.info(`Updating permissions for user ${id}`);

    const updated = await this.db.$transaction(async (tx) => {
      await tx.userPermission.deleteMany({ where: { userId: id } });

      if (permissions.length > 0) {
        await tx.userPermission.createMany({
          data: permissions.map((p) => ({
            userId: id,
            resource: p.resource,
            flags: p.flags,
          })),
        });
      }

      return tx.user.findUniqueOrThrow({
        where: { id },
        ...userProfileQuery,
      });
    });

    await this.invalidateUserCache(updated);

    this.logger.info(`Successfully updated permissions for user ${id}`);
    return UserProfileSchema.parse(updated);
  }
}
