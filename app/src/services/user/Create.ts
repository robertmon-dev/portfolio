import { BaseService } from "../service";
import {
  CreateUserInput,
  UserProfile,
  UserProfileSchema,
} from "@portfolio/shared";
import * as argon2 from "argon2";
import type { UserCreating } from "./types";
import { userProfileQuery } from "./queries";

export class CreateUserService extends BaseService implements UserCreating {
  public async execute(input: CreateUserInput): Promise<UserProfile> {
    const { password, ...data } = input;

    this.logger.info(`Creating new user: ${data.email} with hashing`);

    const passwordDigest = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 3,
    });

    const newUser = await this.db.user.create({
      data: {
        ...data,
        passwordDigest,
      },
      ...userProfileQuery,
    });

    await this.cache.del("users:list:all");

    this.logger.info(`User ${newUser.id} created successfully.`);

    return UserProfileSchema.parse(newUser);
  }
}
