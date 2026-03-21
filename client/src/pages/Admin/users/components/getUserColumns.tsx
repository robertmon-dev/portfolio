import { Column } from "@/components/molecules/EntityTable/types";
import { Tag } from "@/components/atoms/Tag/Tag";
import { Button } from "@/components/atoms/Button/Button";
import { Trash2, Edit2, User } from "lucide-react";
import { UserProfile } from "@portfolio/shared";

export const getUserColumns = (
  onEdit: (user: UserProfile) => void,
  onDelete: (id: string) => void,
  processingId: string | null,
): Column<UserProfile>[] => [
  {
    key: "username",
    header: "User",
    width: "30%",
    render: (user) => (
      <div className="techstack-table__name-row">
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            className="user-table__avatar"
            alt={user.username}
          />
        ) : (
          <User size={14} className="techstack-table__type-icon" />
        )}
        <div className="user-table__identity">
          <span className="techstack-table__title">
            {user.name || user.username}
          </span>
          <span className="user-table__email">{user.email}</span>
        </div>
      </div>
    ),
  },
  {
    key: "role",
    header: "Role",
    width: "20%",
    render: (user) => (
      <Tag variant={user.role === "ADMIN" ? "danger" : "info"} size="sm">
        {user.role}
      </Tag>
    ),
  },
  {
    key: "createdAt",
    header: "Joined",
    width: "25%",
    render: (user) => (
      <span className="user-table__date">
        {new Date(user.createdAt).toLocaleDateString()}
      </span>
    ),
  },
  {
    key: "actions",
    header: "Actions",
    align: "right",
    render: (user) => (
      <div
        className="techstack-table__actions"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(user)}
          isIcon
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
        >
          <Trash2 size={14} />
        </Button>
      </div>
    ),
  },
];
