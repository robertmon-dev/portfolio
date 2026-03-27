import type { Column } from "@/components/molecules/EntityTable/types";
import { Tag } from "@/components/atoms/Tag/Tag";
import { Button } from "@/components/atoms/Button/Button";
import {
  Trash2,
  Edit2,
  User,
  ShieldCheck,
  ShieldAlert,
  KeyRound,
  Lock,
} from "lucide-react";
import type { UserProfile } from "@portfolio/shared";
import type { TFunction } from "i18next";

export const getUsersColumns = (
  t: TFunction,
  onEdit: (user: UserProfile) => void,
  onPermissions: (user: UserProfile) => void,
  onDelete: (id: string) => void,
  processingId: string | null,
): Column<UserProfile>[] => [
  {
    key: "username",
    header: t("admin.users.table.headers.identity", "User Identity"),
    width: "25%",
    render: (user) => (
      <div className="user-table__identity-cell">
        <div className="user-table__avatar-wrapper">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              className="user-table__avatar"
              alt={user.username}
            />
          ) : (
            <div className="user-table__avatar-placeholder">
              <User size={14} />
            </div>
          )}
        </div>
        <div className="user-table__info">
          <span className="user-table__name">{user.name || user.username}</span>
          <span className="user-table__subtext">{user.username}</span>
        </div>
      </div>
    ),
  },
  {
    key: "role",
    header: t("admin.users.table.headers.role", "Role"),
    width: "15%",
    render: (user) => {
      const isAdmin = user.role === "ADMIN";
      return (
        <Tag
          variant={isAdmin ? "danger" : "info"}
          size="sm"
          icon={isAdmin ? <ShieldCheck size={12} /> : undefined}
          maxLength={10}
        >
          {user.role}
        </Tag>
      );
    },
  },
  {
    key: "permissions",
    header: t("admin.users.table.headers.permissions", "Permissions"),
    width: "15%",
    render: (user) => (
      <Tag variant="default" size="sm" icon={<Lock size={12} />} maxLength={20}>
        {t("admin.users.table.resourcesCount", {
          count: user.permissions.length,
          defaultValue: "{{count}} Resources",
        })}
      </Tag>
    ),
  },
  {
    key: "twoFactorEnabled",
    header: t("admin.users.table.headers.2fa", "2FA Status"),
    width: "20%",
    align: "center",
    render: (user) => (
      <Tag
        variant={user.twoFactorEnabled ? "success" : "default"}
        size="sm"
        maxLength={20}
        icon={
          user.twoFactorEnabled ? (
            <KeyRound size={12} />
          ) : (
            <ShieldAlert size={12} />
          )
        }
      >
        {user.twoFactorEnabled
          ? t("common.status.active", "Active")
          : t("common.status.disabled", "Disabled")}
      </Tag>
    ),
  },
  {
    key: "createdAt",
    header: t("admin.users.table.headers.joined", "Joined"),
    width: "10%",
    render: (user) => (
      <span className="user-table__date">
        {new Date(user.createdAt).toLocaleDateString()}
      </span>
    ),
  },
  {
    key: "actions",
    header: t("common.actions", "Actions"),
    align: "right",
    render: (user) => (
      <div className="user-table__actions" onClick={(e) => e.stopPropagation()}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPermissions(user)}
          isIcon
          disabled={processingId === user.id}
          title={t(
            "admin.users.actions.managePermissions",
            "Manage Permissions",
          )}
        >
          <Lock size={14} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(user)}
          isIcon
          title={t("common.edit", "Edit")}
          disabled={processingId === user.id}
        >
          <Edit2 size={14} />
        </Button>
        <Button
          variant="danger"
          size="sm"
          isIcon
          onClick={() => onDelete(user.id)}
          isLoading={processingId === user.id}
          title={t("common.delete", "Delete")}
        >
          <Trash2 size={14} />
        </Button>
      </div>
    ),
  },
];
