import type { AuthorizedContext, Context } from "../context/types";
import type { BaseServiceConstructor } from "./types";

export const executeService = async <
  TInput,
  TOutput,
  TService extends { execute: (input: TInput) => Promise<TOutput> }
>(
  ServiceClass: BaseServiceConstructor<TService>,
  ctx: Context | AuthorizedContext,
  input: TInput
): Promise<TOutput> => {
  const service = new ServiceClass(
    ctx.db,
    ctx.cache,
    ctx.logger,
    ctx.settings
  );

  return await service.execute(input);
};
