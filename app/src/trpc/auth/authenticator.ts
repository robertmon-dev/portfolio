import { Permission } from "../permission/permission";
import { Settings } from "../../core/settings/settings"
import type { Endpoint, Role } from "../permission/types";
import jwt from "jsonwebtoken";
import { Logger } from "../../core/logger/logger";

export class Authenticator {
  private logger: Logger;
  private jwtSecret: string;
  private settings: Settings;
  private static instance: Authenticator;

  private constructor() {
    this.settings = Settings.getInstance();
    this.jwtSecret = this.settings.config.JWT_SECRET;
    this.logger = new Logger('Authenticator');

    if (!this.jwtSecret) {
      this.logger.error('JWT_SECRET is not defined in settings!');
    }
  }

  public authenticate(authHeader: string | undefined): Permission | null {
    if (!authHeader?.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, this.jwtSecret) as {
        sub: string;
        role: Role;
        permissions: Endpoint[];
      };

      return new Permission(decoded.sub, decoded.role, decoded.permissions);
    } catch (err: unknown) {
      this.logger.error('JWT authentication failed', err, {
        tokenSnippet: `${token.substring(0, 8)}...`,
        errorType: err instanceof Error ? err.name : 'UnknownError'
      });
      return null;
    }
  }

  public sign(permissions: Permission, userId: string): string | null {
    try {
      const payload = {
        sub: userId,
        role: permissions.getRole(),
        permissions: permissions.toEndpoints()
      };

      const token = jwt.sign(payload, this.jwtSecret, {
        algorithm: 'HS256',
        expiresIn: '8h'
      });

      this.logger.debug('JWT token signed successfully', { userId });
      return token;

    } catch (err: unknown) {
      this.logger.error('Failed to sign JWT token', err, { userId });
      return null;
    }
  }

  public static getInstance(): Authenticator {
    if (!Authenticator.instance) {
      Authenticator.instance = new Authenticator();
    }

    return Authenticator.instance;
  }
}
