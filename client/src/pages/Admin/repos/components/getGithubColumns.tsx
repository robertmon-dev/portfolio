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
  processingId: string | null
): Column<GithubRepo>[] => [
    {
      key: "name",
      header: "Repository",
      width: "25%",
      render: (repo) => (
        <span className="font-bold text-sm">{repo.name}</span>
      ),
    },
    {
      key: "language",
      header: "Language",
      width: "15%",
      render: (repo) => (
        repo.language ? (
          <Tag variant="info" size="sm">{repo.language}</Tag>
        ) : (
          <span className="text-xs text-muted opacity-50">Unknown</span>
        )
      ),
    },
    {
      key: "stars",
      header: "Stars",
      width: "10%",
      align: "center",
      render: (repo) => <span className="text-sm">⭐ {repo.stars}</span>,
    },
    {
      key: "project",
      header: "Linked Project",
      width: "25%",
      render: (repo) =>
        repo.project ? (
          <Tag variant="success" size="sm">{repo.project.title}</Tag>
        ) : (
          <Tag variant="default" size="sm">Unlinked</Tag>
        ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (repo) => (
        <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
          {repo.project ? (
            <Button
              variant="ghost"
              size="sm"
              isIcon
              onClick={() => onUnlink(repo)}
              title="Unlink from project"
            >
              <Link2Off size={14} className="text-tn-red" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              isIcon
              onClick={() => onLink(repo)}
              title="Link to project"
            >
              <LinkIcon size={14} />
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={() => onEdit(repo)} isIcon title="Edit">
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
