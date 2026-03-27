import { useNavigate } from "react-router-dom";
import { trpc } from "../lib/trpc/client";
import type { LoginInput, VerifyTwoFactorInput } from "@portfolio/shared";

export const useAuth = () => {
  const navigate = useNavigate();
  const utils = trpc.useUtils();

  const { data: user, isLoading: isUserLoading } = trpc.account.me.useQuery(
    undefined,
    {
      retry: false,
      refetchOnWindowFocus: false,
    },
  );

  const loginMutation = trpc.auth.login.useMutation();
  const verify2FAMutation = trpc.auth.verify2FA.useMutation();
  const logoutMutation = trpc.account.logout.useMutation();

  const saveSession = async (token: string) => {
    localStorage.setItem("token", token);
    await utils.account.me.refetch();
  };

  const login = async (data: LoginInput) => {
    const response = await loginMutation.mutateAsync(data);
    if (response.status === "success") {
      await saveSession(response.token);
    }
    return response;
  };

  const confirm2FA = async (data: VerifyTwoFactorInput) => {
    const response = await verify2FAMutation.mutateAsync(data);
    if (response.status === "success") {
      await saveSession(response.token);
    }
    return response;
  };

  const logout = async () => {
    try {
      if (localStorage.getItem("token")) {
        await logoutMutation.mutateAsync();
      }
    } catch {
      //***
    } finally {
      localStorage.removeItem("token");
      utils.account.me.setData(undefined, undefined);
      await utils.invalidate();

      navigate("/demo");
    }
  };

  return {
    user,
    isLoggedIn: !!user,
    isUserLoading,
    login,
    confirm2FA,
    logout,
    isLoggingIn: loginMutation.isPending || verify2FAMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    error: loginMutation.error || verify2FAMutation.error,
  };
};
