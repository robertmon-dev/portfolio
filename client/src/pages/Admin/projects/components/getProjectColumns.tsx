import { ProjectWithRelations } from "@portfolio/shared";
import { Column } from "@/components/molecules/EntityTable/types";
import { Tag } from "@/components/atoms/Tag/Tag";
import { Button } from "@/components/atoms/Button/Button";
import { Trash2, Edit2, Star, EyeOff, Eye, Github } from "lucide-react";

export const getProjectColumns = (
  onEdit: (project: ProjectWithRelations) => void,
  onDelete: (id: string) => void,
  processingId: string | null
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
      key: "status",
      header: "Status",
      width: "15%",
      render: (project) => (
        <div className="flex items-center gap-2">
          {project.isVisible ? (
            <Tag variant="success" size="sm" icon={<Eye size={12} />}>Visible</Tag>
          ) : (
            <Tag variant="default" size="sm" icon={<EyeOff size={12} />}>Draft</Tag>
          )}
          {project.isFeatured && (
            <Star size={16} className="text-tn-yellow fill-tn-yellow opacity-80" />
          )}
        </div>
      ),
    },
    {
      key: "techStack",
      header: "Tech Stack",
      width: "25%",
      render: (project) => {
        const stack = project.techStack || [];
        if (stack.length === 0) return <span className="text-xs text-muted">None</span>;

        return (
          <div className="flex flex-wrap items-center gap-1">
            {stack.slice(0, 3).map((tech) => (
              <Tag key={tech.id} variant="info" size="sm">{tech.name}</Tag>
            ))}
            {stack.length > 3 && (
              <span className="text-xs text-muted ml-1">+{stack.length - 3}</span>
            )}
          </div>
        );
      },
    },
    {
      key: "github",
      header: "Repository",
      width: "15%",
      render: (project) => (
        project.githubRepo ? (
          <div className="flex items-center gap-1.5 text-sm text-tn-blue">
            <Github size={14} />
            <span className="truncate max-w-[100px]">{project.githubRepo.name}</span>
          </div>
        ) : (
          <span className="text-xs text-muted">Not linked</span>
        )
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (project) => (
        <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="sm" onClick={() => onEdit(project)} title="Edit Project">
            <Edit2 size={14} />
          </Button>
          <Button
            variant="danger"
            size="sm"
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
