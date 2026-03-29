import { BaseService } from "../service";
import { UserPublicSchema, type UserPublic } from "@portfolio/shared";
import { userPublicQuery } from "./queries";
import { TRPCError } from "@trpc/server";
import { PublicingUsers } from "./types";

export class GetPublicProfileService
  extends BaseService
  implements PublicingUsers
{
  public async execute(): Promise<UserPublic> {
    const ownerNickname = this.settings.ROOT_USERNAME;

    const user = await this.cache.wrap(`user:public:root`, 3600, async () => {
      this.logger.info(`Fetching public profile for owner: ${ownerNickname}`);
      const result = await this.db.user.findUnique({
        where: { username: ownerNickname },
        ...userPublicQuery,
      });

      return result;
    });

    if (!user) {
      this.logger.error(
        `Root user [${ownerNickname}] not found. Check your .env/seed!`,
      );
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Public profile not found.",
      });
    }

    return UserPublicSchema.parse(user);
  }
}
