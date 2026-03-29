import type { TechStackCategory } from "@portfolio/shared";
import type { BadgeVariant } from "@/components/atoms/Badge/types";

export const CATEGORY_VARIANT_MAP: Record<TechStackCategory, BadgeVariant> = {
  Frontend: "info",
  Backend: "primary",
  Fullstack: "primary",
  Mobile: "info",
  Infrastructure: "warning",
  Database: "success",
  Design: "secondary",
  Tools: "secondary",
};
