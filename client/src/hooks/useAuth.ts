import { useNavigate } from "react-router-dom";
import { trpc } from '../lib/trpc/client';
import type { LoginInput, VerifyTwoFactorInput } from '@portfolio/shared';

export const useAuth = () => {
  const navigate = useNavigate();
  const utils = trpc.useUtils();

  const loginMutation = trpc.auth.login.useMutation();
  const verify2FAMutation = trpc.auth.verify2FA.useMutation();
  const logoutMutation = trpc.account.logout.useMutation();

  const saveSession = (token: string) => {
    localStorage.setItem('token', token);
    utils.account.me.invalidate();
    navigate('/admin/dashboard');
  };

  const login = async (data: LoginInput) => {
    const response = await loginMutation.mutateAsync(data);

    if (response.status === 'success') {
      saveSession(response.token);
    }

    return response;
  };

  const confirm2FA = async (data: VerifyTwoFactorInput) => {
    const response = await verify2FAMutation.mutateAsync(data);

    if (response.status === 'success') {
      saveSession(response.token);
    }

    return response;
  };

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } finally {
      localStorage.removeItem('token');
      await utils.invalidate();
      navigate('/');
    }
  };

  return {
    login,
    confirm2FA,
    logout,
    isLoggingIn: loginMutation.isPending || verify2FAMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    error: loginMutation.error || verify2FAMutation.error,
  };
};
