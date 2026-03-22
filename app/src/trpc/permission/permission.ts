import { Role, PermissionFlag } from "@prisma/client";
import { Flag, Endpoint } from "./types";
import { Logger } from "../../core/logger/logger";
import { RoleEnum } from "@portfolio/shared";

export class Permission {
  private userId: string | null;
  private role: Role;
  private permissionsMap: Map<string, Set<Flag>>;
  private logger: Logger;

  public constructor(
    userId: string | null,
    role: Role,
    dbPermissions: { resource: string; flags: PermissionFlag[] }[],
  ) {
    this.userId = userId;
    this.role = role;
    this.logger = new Logger("Permission");

    this.permissionsMap = new Map(
      dbPermissions.map((p) => [
        p.resource,
        new Set(p.flags.map((f) => f.toLowerCase() as Flag)),
      ]),
    );
  }

  public getUserId(): string | null {
    return this.userId;
  }

  public getRole(): Role {
    return this.role;
  }

  public getPermissionMap(): Map<string, Set<Flag>> {
    return this.permissionsMap;
  }

  public can(endpointName: string, required: Flag): boolean {
    if (this.role === Role.ADMIN) {
      this.logger.debug(`Access granted: User is global Admin`, {
        endpointName,
        required,
      });
      return true;
    }

    const flags = this.permissionsMap.get(endpointName);

    if (!flags) {
      this.logger.warn(`Access denied: No permissions defined for resource`, {
        endpointName,
        role: this.role,
      });
      return false;
    }

    const hasSpecificFlag = flags.has(required);
    const hasResourceAdmin = flags.has(RoleEnum.enum.ADMIN);

    if (hasSpecificFlag || hasResourceAdmin) {
      this.logger.debug(`Access granted: Permission match`, {
        endpointName,
        required,
        viaResourceAdmin: hasResourceAdmin,
      });
      return true;
    }

    this.logger.warn(`Access denied: Missing required flag`, {
      endpointName,
      required,
      availableFlags: Array.from(flags),
    });

    return false;
  }

  public static fromJSON(
    userId: string,
    role: Role,
    dbPermissions: { resource: string; flags: PermissionFlag[] }[],
  ): Permission {
    return new Permission(userId, role, dbPermissions);
  }

  public toEndpoints(): Endpoint[] {
    return Array.from(this.permissionsMap.entries()).map(([name, flags]) => ({
      name,
      flags: Array.from(flags),
    }));
  }

  public static fromEndpoints(
    userId: string,
    role: Role,
    endpoints: Endpoint[],
  ): Permission {
    const mapped = endpoints.map((e) => ({
      resource: e.name,
      flags: e.flags.map((f) => f.toUpperCase() as PermissionFlag),
    }));

    return new Permission(userId, role, mapped);
  }
}
