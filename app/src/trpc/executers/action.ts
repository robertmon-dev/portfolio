import type { AuthorizedContext, Context } from "../context/types";
import type { BaseServiceConstructor } from "./types";

export async function invokeAction<
  TService extends Record<TMethod, (input: never) => unknown>,
  TMethod extends keyof TService,
  TInput extends TService[TMethod] extends (input: infer I) => unknown ? I : never,
  TReturn extends TService[TMethod] extends (input: never) => infer R ? R : never
>(
  ServiceClass: BaseServiceConstructor<TService>,
  ctx: Context | AuthorizedContext,
  method: TMethod,
  input: TInput
): Promise<Awaited<TReturn>> {
  const service = new ServiceClass(
    ctx.db,
    ctx.cache,
    ctx.logger,
    ctx.settings
  );

  const action = service[method]
  if (typeof action !== 'function') {
    throw new Error(`[Service Error] Method ${String(method)} not found on ${ServiceClass.name}`);
  }

  const callableAction = (action as unknown) as (input: TInput) => Promise<TReturn> | TReturn;

  const result = await callableAction.call(service, input);
  return result as Awaited<TReturn>;
}
