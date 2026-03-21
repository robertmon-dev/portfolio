import { PrismaClient, Role, PermissionFlag } from "@prisma/client";
import type { Logging } from "../../../core/logger/types";
import * as argon2 from "argon2";
import type { Growing } from "../types";
import type { EnvConfig } from "../../../core/settings/types";

export class AdminSeed implements Growing {
  constructor(
    private readonly db: PrismaClient,
    private readonly logger: Logging,
    private readonly config: EnvConfig,
  ) {}

  public async grow(): Promise<void> {
    this.logger.info("Seeding users and core permissions...");

    try {
      const { ROOT_EMAIL, ROOT_PASSWORD, ROOT_USERNAME } = this.config;

      const passwordDigest = await argon2.hash(ROOT_PASSWORD, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        timeCost: 3,
      });

      const rootUser = await this.db.user.upsert({
        where: { email: ROOT_EMAIL },
        update: {},
        create: {
          email: ROOT_EMAIL,
          username: ROOT_USERNAME,
          passwordDigest,
          role: Role.ADMIN,
          name: "System Admin",
          headline: "Root Administrator",
          twoFactorEnabled: true,
        },
      });

      const resources = [
        "users",
        "projects",
        "github",
        "techStack",
        "experience",
        "diagnostics",
      ];
      const allFlags: PermissionFlag[] = [
        PermissionFlag.READ,
        PermissionFlag.WRITE,
        PermissionFlag.ADMIN,
      ];

      this.logger.info(`Assigning full permissions to ${rootUser.username}...`);

      await Promise.all(
        resources.map((resource) =>
          this.db.userPermission.upsert({
            where: {
              userId_resource: {
                userId: rootUser.id,
                resource,
              },
            },
            update: { flags: allFlags },
            create: {
              userId: rootUser.id,
              resource,
              flags: allFlags,
            },
          }),
        ),
      );

      this.logger.info(`Root user and permissions seeded successfully.`);
    } catch (error) {
      this.logger.error("Failed to seed root user or permissions", error);
      throw error;
    }
  }
}
