import type { AuthorizedContext, Context } from "../context/types";
import type { BaseServiceConstructor } from "./types";
import { handleServiceError } from "./handlers/serviceError";

export const executeService = async <
  TInput,
  TOutput,
  TService extends { execute: (input: TInput) => Promise<TOutput> },
>(
  ServiceClass: BaseServiceConstructor<TService>,
  ctx: Context | AuthorizedContext,
  input: TInput,
): Promise<TOutput> => {
  const service = new ServiceClass(ctx.db, ctx.cache, ctx.logger, ctx.settings);

  try {
    return await service.execute(input);
  } catch (error) {
    throw handleServiceError(error, ctx.logger);
  }
};
