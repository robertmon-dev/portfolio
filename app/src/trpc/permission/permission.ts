import { Endpoint, Flag, Role } from "./types";
import { Logger } from "../../core/logger/logger";

export class Permission {
  private userId: string | null;
  private role: Role;
  private permissionsMap: Map<string, Set<Flag>>;
  private logger: Logger;

  public constructor(userId: string, role: Role, endpoints: Endpoint[]) {
    this.role = role;
    this.permissionsMap = new Map(
      endpoints.map((e) => [e.name, new Set(e.flags)])
    );
    this.logger = new Logger("Permission");
    this.userId = userId;
  }

  public getUserId(): string | null {
    return this.userId;
  }

  public can(endpointName: string, required: Flag): boolean {
    if (this.role === Role.ADMIN) {
      this.logger.debug(`Access granted: User is global Admin`, { endpointName, required });
      return true;
    }

    const flags = this.permissionsMap.get(endpointName);
    if (!flags) {
      this.logger.warn(`Access denied: No permissions defined for resource`, {
        endpointName,
        role: this.role
      });
      return false;
    }

    const hasSpecificFlag = flags.has(required);
    const hasResourceAdmin = flags.has(Flag.Admin);

    if (hasSpecificFlag || hasResourceAdmin) {
      this.logger.debug(`Access granted: Permission match`, {
        endpointName,
        required,
        viaResourceAdmin: hasResourceAdmin
      });
      return true;
    }

    this.logger.warn(`Access denied: Missing required flag`, {
      endpointName,
      required,
      availableFlags: Array.from(flags)
    });

    return false;
  }

  public static fromJSON(userId: string, role: Role, endpoints: Endpoint[]): Permission {
    return new Permission(userId, role, endpoints);
  }

  public toEndpoints(): Endpoint[] {
    return Array.from(this.permissionsMap.entries()).map(([name, flags]) => ({
      name,
      flags: Array.from(flags)
    }));
  }

  public getRole(): Role {
    return this.role;
  }

  public getPermissionMap(): Map<string, Set<Flag>> {
    return this.permissionsMap;
  }
}
