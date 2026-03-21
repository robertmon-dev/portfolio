import { ProjectWithRelations } from "@portfolio/shared";
import { Column } from "@/components/molecules/EntityTable/types";
import { Tag } from "@/components/atoms/Tag/Tag";
import { Button } from "@/components/atoms/Button/Button";
import { Trash2, Edit2, Star, EyeOff, Eye, Github } from "lucide-react";

export const getProjectColumns = (
  onEdit: (project: ProjectWithRelations) => void,
  onDelete: (id: string) => void,
  processingId: string | null,
): Column<ProjectWithRelations>[] => [
  {
    key: "title",
    header: "Project",
    width: "30%",
    render: (project) => (
      <div className="flex flex-col gap-0.5">
        <span className="font-bold text-sm">{project.title}</span>
        <span className="text-xs text-muted opacity-70">/{project.slug}</span>
      </div>
    ),
  },
  {
    key: "isFeatured",
    header: "Featured",
    width: "8%",
    align: "center",
    render: (project) => (
      <div className="flex justify-center">
        {project.isFeatured ? (
          <span className="text-sm">⭐</span>
        ) : (
          <Star size={18} className="text-muted opacity-10" />
        )}
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    width: "12%",
    render: (project) => (
      <div className="flex items-center gap-2">
        {project.isVisible ? (
          <Tag variant="success" size="sm" icon={<Eye size={12} />}>
            Visible
          </Tag>
        ) : (
          <Tag variant="default" size="sm" icon={<EyeOff size={12} />}>
            Draft
          </Tag>
        )}
      </div>
    ),
  },
  {
    key: "techStack",
    header: "Tech Stack",
    width: "20%",
    render: (project) => {
      const stack = project.techStack || [];
      if (stack.length === 0)
        return <span className="text-xs text-muted">None</span>;

      return (
        <div className="flex flex-wrap items-center gap-1">
          {stack.slice(0, 2).map((tech) => (
            <Tag key={tech.id} variant="info" size="sm">
              {tech.name}
            </Tag>
          ))}
          {stack.length > 2 && (
            <span className="text-xs text-muted ml-1">+{stack.length - 2}</span>
          )}
        </div>
      );
    },
  },
  {
    key: "github",
    header: "Repository",
    width: "15%",
    render: (project) =>
      project.githubRepo ? (
        <div className="flex items-center gap-1.5 text-sm text-tn-blue">
          <Github size={14} />
          <span className="truncate max-w-[80px]">
            {project.githubRepo.name}
          </span>
        </div>
      ) : (
        <span className="text-xs text-muted">Not linked</span>
      ),
  },
  {
    key: "actions",
    header: "Actions",
    align: "right",
    render: (project) => (
      <div
        className="flex flex-row items-center justify-end gap-2 whitespace-nowrap"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="ghost"
          size="sm"
          isIcon
          onClick={() => onEdit(project)}
          title="Edit Project"
        >
          <Edit2 size={14} />
        </Button>
        <Button
          variant="danger"
          size="sm"
          isIcon
          onClick={() => onDelete(project.id)}
          isLoading={processingId === project.id}
          title="Delete Project"
        >
          <Trash2 size={14} />
        </Button>
      </div>
    ),
  },
];
