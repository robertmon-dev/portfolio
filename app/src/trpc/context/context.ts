import * as trpcExpress from "@trpc/server/adapters/express";
import { userWithPermissionsFragment } from "../../services/user/queries";
import { Database } from "../../core/database/database";
import { Settings } from "../../core/settings/settings";
import { Logger } from "../../core/logger/logger";
import { CacheStore } from "../../infrastructure/cache/cacheStore";
import type { Context, AuthorizedContext } from "./types";
import { Permission } from "../permission/permission";
import { Authenticator } from "../auth/authenticator";
import { TRPCError } from "@trpc/server";

export class TrpcContext {
  private db: Database;
  private settings: Settings;
  private logger: Logger;
  private cache: CacheStore;

  public constructor() {
    this.db = Database.getInstance();
    this.settings = Settings.getInstance();
    this.logger = new Logger("request");
    this.cache = CacheStore.getInstance();
  }

  public create = async ({
    req,
    res,
  }: trpcExpress.CreateExpressContextOptions): Promise<Context> => {
    const ip = req.ip || req.socket.remoteAddress || "unknown";
    const authHeader: string | undefined = req.headers.authorization;
    const authenticator: Authenticator = Authenticator.getInstance();
    const permissions: Permission | null = await authenticator.authenticate(
      authHeader,
      this.cache,
    );

    return {
      db: this.db.client,
      cache: this.cache,
      settings: this.settings.config,
      req,
      res,
      ip,
      logger: this.logger,
      permissions: permissions,
    };
  };

  public static async authorizeContext(
    ctx: Context,
  ): Promise<AuthorizedContext> {
    if (!ctx.permissions) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "No valid token provided",
      });
    }

    const userId: string | null = ctx.permissions.getUserId();
    if (!userId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "No valid user provided for this token",
      });
    }

    const user = await ctx.db.user.findUnique({
      where: { id: userId },
      ...userWithPermissionsFragment,
    });

    if (!user) {
      ctx.logger.warn("Auth failed: User not found in database", { userId });
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User no longer exists",
      });
    }

    return {
      ...ctx,
      user,
      permissions: new Permission(user.id, user.role, user.permissions),
    };
  }
}
