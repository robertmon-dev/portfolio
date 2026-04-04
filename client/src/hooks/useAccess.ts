import { useCallback, useMemo } from "react";
import { trpc } from "../lib/trpc/client";
import { FlagEnum, RoleEnum, type Flag, type Role } from "@portfolio/shared";

export const useAccess = () => {
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = trpc.account.me.useQuery(undefined, {
    staleTime: Infinity,
    retry: false,
    meta: {
      silent: true,
    },
  });

  const permissionsMap = useMemo(() => {
    const map = new Map<string, Set<Flag>>();
    if (!user?.permissions) return map;

    user.permissions.forEach((p) => {
      map.set(p.resource, new Set(p.flags));
    });
    return map;
  }, [user]);

  const can = useCallback(
    (resource: string, required: string = FlagEnum.enum.READ): boolean => {
      if (!user) return false;
      if (user.role === RoleEnum.enum.ADMIN) return true;

      let targetResource = resource;
      let targetFlag = required.toUpperCase() as Flag;

      if (resource.includes(":")) {
        const [res, fl] = resource.split(":");
        targetResource = res;
        targetFlag = fl.toUpperCase() as Flag;
      }

      const flags = permissionsMap.get(targetResource);
      if (!flags) return false;

      return flags.has(targetFlag) || flags.has(RoleEnum.enum.ADMIN);
    },
    [user, permissionsMap],
  );

  const hasRole = (role: Role | Role[]) => {
    if (!user) return false;
    const roles = Array.isArray(role) ? role : [role];
    return roles.includes(user.role);
  };

  return {
    user,
    isLoading,
    isError,
    error,
    isAuthenticated: !!user,
    isAdmin: user?.role === RoleEnum.enum.ADMIN,
    can,
    hasRole,
  };
};
