import type { AuthorizedContext, Context } from "../context/types";
import type {
  AuthorizedBaseServiceConstructor,
  BaseServiceConstructor,
} from "./types";
import { handleServiceError } from "./handlers/serviceError";

export interface Serving<TInput, TOutput> {
  execute(input: TInput): Promise<TOutput>;
}

export const executeService = async <
  TInput,
  TOutput,
  TService extends Serving<TInput, TOutput>,
>(
  ServiceClass: BaseServiceConstructor<TService>,
  ctx: Context | AuthorizedContext,
  input: TInput,
): Promise<TOutput> => {
  const service = new ServiceClass(
    ctx.db,
    ctx.cache,
    ctx.logger,
    ctx.settings,
    ctx,
  );

  try {
    return await service.execute(input);
  } catch (error) {
    return handleServiceError(error, ctx.logger);
  }
};

export const executeAuthorizedService = async <
  TInput,
  TOutput,
  TService extends Serving<TInput, TOutput>,
>(
  ServiceClass: AuthorizedBaseServiceConstructor<TService>,
  ctx: AuthorizedContext,
  input: TInput,
): Promise<TOutput> => {
  const service = new ServiceClass(
    ctx.db,
    ctx.cache,
    ctx.logger,
    ctx.settings,
    ctx,
  );

  try {
    return await service.execute(input);
  } catch (error) {
    return handleServiceError(error, ctx.logger);
  }
};
