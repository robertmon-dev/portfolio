import { Permission } from "../permission/permission";
import type { Caching } from "../../infrastructure/cache/types";

export interface Authorizing {
  extractToken(authHeader: string | undefined): string | null;
  authenticate(authHeader: string | undefined, cache: Caching): Promise<Permission | null>;
  sign(permissions: Permission, userId: string): string | null;
  getTokenRemainingTTL(token: string): number;
}
