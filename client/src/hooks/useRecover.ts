import { trpc } from '../lib/trpc/client';
import type { RequestPasswordResetInput, ResetPasswordInput } from '@portfolio/shared';

export const useRecover = () => {
  const requestMutation = trpc.auth.requestPasswordReset.useMutation();
  const resetMutation = trpc.auth.resetPassword.useMutation();

  const requestReset = async (data: RequestPasswordResetInput) => {
    return await requestMutation.mutateAsync(data);
  };

  const confirmReset = async (data: ResetPasswordInput) => {
    return await resetMutation.mutateAsync(data);
  };

  return {
    requestReset,
    confirmReset,
    isRecovering: requestMutation.isPending || resetMutation.isPending,
    error: requestMutation.error || resetMutation.error,
  };
};
