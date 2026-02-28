import { PrismaClient, Role } from '@prisma/client';
import type { Logging } from '../../../core/logger/types';
import * as argon2 from 'argon2';
import type { Growing } from '../types';

export class AdminSeed implements Growing {
  constructor(
    private readonly db: PrismaClient,
    private readonly logger: Logging
  ) { }

  public async run(): Promise<void> {
    this.logger.info('Seeding users...');

    try {
      const rootEmail = process.env.ROOT_EMAIL || 'admin@example.com';
      const rootPassword = process.env.ROOT_PASSWORD || 'admin123';
      const rootUsername = process.env.ROOT_USERNAME || 'root';

      const passwordDigest = await argon2.hash(rootPassword, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        timeCost: 3,
      });

      await this.db.user.upsert({
        where: { email: rootEmail },
        update: {},
        create: {
          email: rootEmail,
          username: rootUsername,
          passwordDigest,
          role: Role.ADMIN,
          name: 'System Admin',
          headline: 'Root Administrator',
          twoFactorEnabled: true,
        },
      });

      this.logger.info('Root user seeded successfully.');
    } catch (error) {
      this.logger.error('Failed to seed root user', error);
      throw error;
    }
  }
}
