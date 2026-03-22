import type { ReactNode } from "react";
import { type Role } from "@portfolio/shared";

export interface GuardProps {
  children: ReactNode;
  requiredRole?: Role | Role[];
  requiredPermission?: string;
  redirectTo?: string;
}
