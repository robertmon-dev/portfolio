import { trpc } from '../lib/trpc/client';
import { RoleEnum, type Role } from '@portfolio/shared';

const ROLE_PERMISSIONS: Record<Exclude<Role, 'ADMIN'>, string[]> = {
  MODERATOR: [
    'projects:*',
    'github:*',
    'experience:*',
    'blog:*',
    'profile:edit'
  ],
  VIEWER: [
    'projects:read',
    'github:read',
    'experience:read',
    'blog:read'
  ],
  USER: [
    'profile:edit'
  ],
};

export const useAccess = () => {
  const { data: user, isLoading } = trpc.account.me.useQuery(undefined, {
    staleTime: Infinity,
    retry: false,
  });

  const hasRole = (role: Role | Role[]) => {
    if (!user) return false;
    const roles = Array.isArray(role) ? role : [role];
    return roles.includes(user.role);
  };

  const can = (permission: string): boolean => {
    if (!user) return false;

    if (user.role === RoleEnum.enum.ADMIN) return true;

    const permissions = ROLE_PERMISSIONS[user.role as Exclude<Role, 'ADMIN'>] || [];

    if (permissions.includes(permission)) return true;

    const [domain] = permission.split(':');
    return permissions.includes(`${domain}:*`);
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.role === RoleEnum.enum.ADMIN,
    hasRole,
    can,
  };
};
