import { useAccess } from "@/hooks/useAccess";
import { LoadingBar } from "@/components/atoms/LoadingBar/LoadingBar";
import { ErrorPage } from "@/pages/Error/Error";
import type { GuardProps } from "./types";
import "@/pages/Admin/repos/Repos.scss";

export const Guard = ({
  children,
  requiredRole,
  requiredPermission,
}: GuardProps) => {
  const { isAuthenticated, isLoading, hasRole, can } = useAccess();

  if (isLoading) {
    return (
      <div className="github-management">
        <div className="github-management__loader-container">
          <LoadingBar isLoading={true} variant="primary" fullWidth />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <ErrorPage code="404" />;
  }

  const hasRequiredRole = !requiredRole || hasRole(requiredRole);
  const hasRequiredPermission = !requiredPermission || can(requiredPermission);

  if (!hasRequiredRole || !hasRequiredPermission) {
    return <ErrorPage code="403" />;
  }

  return <>{children}</>;
};
