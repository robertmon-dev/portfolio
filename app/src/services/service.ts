import { PrismaClient } from "@prisma/client";
import type { Logging } from "../core/logger/types";
import type { Caching } from "../infrastructure/cache/types";
import type { Settings } from "../core/settings/settings";
import type { AuthorizedContext, Context } from "../trpc/context/types";
import type { Serving } from "../trpc/executers/base";
import { Invalidating } from "./types";
import { CacheInvalidator } from "./cacheInvalidator";

export abstract class BaseService<TInput, TOutput> implements Serving<
  TInput,
  TOutput
> {
  protected cacheInvalidator: Invalidating;

  constructor(
    protected readonly db: PrismaClient,
    protected readonly cache: Caching,
    protected readonly logger: Logging,
    protected readonly settings: Settings["config"],
    protected readonly ctx: Context | AuthorizedContext | null,
  ) {
    this.cacheInvalidator = new CacheInvalidator(logger, cache, settings);
  }

  abstract execute(input: TInput): Promise<TOutput>;
}

export abstract class AuthorizedBaseService<TInput, TOutput>
  extends BaseService<TInput, TOutput>
  implements Serving<TInput, TOutput>
{
  constructor(
    db: PrismaClient,
    cache: Caching,
    logger: Logging,
    settings: Settings["config"],
    protected override readonly ctx: AuthorizedContext,
  ) {
    super(db, cache, logger, settings, ctx);
  }

  abstract execute(input: TInput): Promise<TOutput>;
}
