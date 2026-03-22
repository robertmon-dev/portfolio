import { RoleEnum } from "@portfolio/shared";
import type { TFunction } from "i18next";

export const getRoleOptions = (t: TFunction) => [
  { label: t("admin.users.roles.user", "User"), value: RoleEnum.enum.USER },
  { label: t("admin.users.roles.admin", "Admin"), value: RoleEnum.enum.ADMIN },
  {
    label: t("admin.users.roles.moderator", "Moderator"),
    value: RoleEnum.enum.MODERATOR,
  },
  {
    label: t("admin.users.roles.viewer", "Viewer"),
    value: RoleEnum.enum.VIEWER,
  },
];
