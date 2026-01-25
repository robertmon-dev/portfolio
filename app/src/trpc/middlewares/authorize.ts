import { middleware } from '../init';
import { TRPCError } from '@trpc/server';
import type { Flag } from '../permission/types';

export const authorize = (endpointName: string, requiredFlag: Flag) =>
  middleware(({ ctx, next }) => {
    if (!ctx.permissions) {
      ctx.logger.warn('Unauthorized access attempt: No permissions object found in context', {
        endpointName,
        requiredFlag,
      });
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You have to be logged in to perform this action'
      });
    }

    const hasAccess = ctx.permissions.can(endpointName, requiredFlag);

    if (!hasAccess) {
      ctx.logger.warn(`Forbidden: User ${ctx.permissions.getRole()} lacks ${requiredFlag} flag for ${endpointName}`);

      throw new TRPCError({
        code: 'FORBIDDEN',
        message: `No permissions ${requiredFlag} for resources under ${endpointName}`,
      });
    }

    return next({
      ctx: {
        ...ctx,
        permissions: ctx.permissions,
      },
    });
  });
