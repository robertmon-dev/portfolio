import { BaseService } from "../service";
import type { DeleteUserInput } from "@portfolio/shared";
import type { UserDeleting } from "./types";

export class DeleteUserService extends BaseService implements UserDeleting {
  public async execute(input: DeleteUserInput): Promise<void> {
    const { id } = input;

    this.logger.warn(`Critical action: Attempting to remove user ID ${id}`);

    const user = await this.db.user.delete({
      where: { id },
    });

    await Promise.all([
      this.cache.del("users:list:all"),
      this.cache.del("users:list:*"),
      this.cache.del(`user:profile:${id}`),
      this.cache.del(`user:profile:${user.email}`),
      this.cache.del(`user:profile:${user.username}`),
    ]);

    this.logger.info(
      `User ${id} (${user.email}) permanently removed and cache invalidated.`,
    );
  }
}
