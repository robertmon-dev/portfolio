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

    await this.invalidateUserCache(user);

    this.logger.info(`User ${id} removed and cache invalidated.`);
  }
}
