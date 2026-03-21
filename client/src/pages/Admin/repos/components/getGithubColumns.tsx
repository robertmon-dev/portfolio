import { Column } from "@/components/molecules/EntityTable/types";
import { Tag } from "@/components/atoms/Tag/Tag";
import { Button } from "@/components/atoms/Button/Button";
import { Trash2, Edit2, Link as LinkIcon, Link2Off } from "lucide-react";
import { GithubRepo } from "@portfolio/shared";

export const getGithubColumns = (
  onEdit: (repo: GithubRepo) => void,
  onDelete: (id: string) => void,
  onLink: (repo: GithubRepo) => void,
  onUnlink: (repo: GithubRepo) => void,
  processingId: string | null,
): Column<GithubRepo>[] => [
  {
    key: "name",
    header: "Repository",
    width: "25%",
    render: (repo) => (
      <div className="github-table__name-col">
        <span className="github-table__repo-name" title={repo.name}>
          {repo.name}
        </span>
      </div>
    ),
  },
  {
    key: "language",
    header: "Language",
    width: "15%",
    render: (repo) => (
      <div className="github-table__lang-col">
        {repo.language ? (
          <Tag variant="info" size="sm">
            {repo.language}
          </Tag>
        ) : (
          <span className="github-table__empty">Unknown</span>
        )}
      </div>
    ),
  },
  {
    key: "stars",
    header: "Stars",
    width: "10%",
    align: "center",
    render: (repo) => (
      <span className="github-table__stars">⭐ {repo.stars}</span>
    ),
  },
  {
    key: "project",
    header: "Linked Project",
    width: "25%",
    render: (repo) => (
      <div className="github-table__project-col">
        {repo.project ? (
          <Tag
            variant="success"
            size="sm"
            maxLength={20}
            onDismiss={() => onUnlink(repo)} // Opcja odpięcia bezpośrednio z taga
          >
            {repo.project.title}
          </Tag>
        ) : (
          <Tag variant="default" size="sm">
            Unlinked
          </Tag>
        )}
      </div>
    ),
  },
  {
    key: "actions",
    header: "Actions",
    align: "right",
    render: (repo) => (
      <div
        className="github-table__actions"
        onClick={(e) => e.stopPropagation()}
      >
        {repo.project ? (
          <Button
            variant="ghost"
            size="sm"
            isIcon
            onClick={() => onUnlink(repo)}
            title="Unlink from project"
            disabled={processingId === repo.id}
          >
            <Link2Off size={14} className="github-table__icon--unlink" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            isIcon
            onClick={() => onLink(repo)}
            title="Link to project"
            disabled={processingId === repo.id}
          >
            <LinkIcon size={14} />
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(repo)}
          isIcon
          title="Edit"
          disabled={processingId === repo.id}
        >
          <Edit2 size={14} />
        </Button>
        <Button
          variant="danger"
          size="sm"
          isIcon
          onClick={() => onDelete(repo.id)}
          isLoading={processingId === repo.id}
          title="Delete"
        >
          <Trash2 size={14} />
        </Button>
      </div>
    ),
  },
];
