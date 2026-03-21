import { BaseService } from "../service";
import type { CreateUserInput } from "@portfolio/shared";
import type { User } from "@prisma/client";
import * as argon2 from "argon2";

export class CreateUserService extends BaseService {
  public async execute(input: CreateUserInput): Promise<User> {
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
    });

    await this.cache.del("users:list:all");

    this.logger.info(`User ${newUser.id} created successfully.`);
    return newUser;
  }
}
