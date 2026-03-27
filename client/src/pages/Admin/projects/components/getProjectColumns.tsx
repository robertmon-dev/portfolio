import type { ProjectWithRelations } from "@portfolio/shared";
import type { Column } from "@/components/molecules/EntityTable/types";
import { Tag } from "@/components/atoms/Tag/Tag";
import { Button } from "@/components/atoms/Button/Button";
import { Trash2, Edit2, Star, EyeOff, Eye, Github } from "lucide-react";
import type { TFunction } from "i18next";

export const getProjectColumns = (
  t: TFunction,
  onEdit: (project: ProjectWithRelations) => void,
  onDelete: (id: string) => void,
  onUnlinkTech: (projectId: string, techStackId: string) => void,
  onUnlinkRepo: (repoId: string) => void,
  processingId: string | null,
): Column<ProjectWithRelations>[] => [
  {
    key: "title",
    header: t("admin.projects.table.project", "Project"),
    width: "25%",
    render: (project) => (
      <div className="projects-table__title-col">
        <span className="projects-table__title" title={project.title}>
          {project.title}
        </span>
        <span className="projects-table__slug" title={`/${project.slug}`}>
          /{project.slug}
        </span>
      </div>
    ),
  },
  {
    key: "isFeatured",
    header: t("admin.projects.table.featured", "Featured"),
    width: "8%",
    align: "center",
    render: (project) => (
      <div className="projects-table__featured-col">
        {project.isFeatured ? (
          <span className="projects-table__star--active">⭐</span>
        ) : (
          <Star size={18} className="projects-table__star--inactive" />
        )}
      </div>
    ),
  },
  {
    key: "status",
    header: t("admin.projects.table.status", "Status"),
    width: "12%",
    render: (project) => (
      <div className="projects-table__status-col">
        {project.isVisible ? (
          <Tag variant="success" size="sm" icon={<Eye size={12} />}>
            {t("common.visible", "Visible")}
          </Tag>
        ) : (
          <Tag variant="default" size="sm" icon={<EyeOff size={12} />}>
            {t("common.draft", "Draft")}
          </Tag>
        )}
      </div>
    ),
  },
  {
    key: "github",
    header: t("admin.projects.table.repository", "Repository"),
    width: "15%",
    render: (project) =>
      project.githubRepo ? (
        <Tag
          variant="info"
          size="sm"
          icon={<Github size={12} />}
          onDismiss={
            processingId === project.id
              ? undefined
              : () => onUnlinkRepo(project.githubRepo!.id)
          }
          disabled={processingId === project.id}
        >
          <span
            className="projects-table__github-text"
            title={project.githubRepo.name}
          >
            {project.githubRepo.name}
          </span>
        </Tag>
      ) : (
        <span className="projects-table__empty">
          {t("admin.projects.table.notLinked", "Not linked")}
        </span>
      ),
  },
  {
    key: "techStack",
    header: t("admin.projects.table.techStack", "Tech Stack"),
    width: "30%",
    render: (project) => {
      const stack = project.techStack || [];

      if (stack.length === 0)
        return (
          <span className="projects-table__empty">
            {t("admin.projects.table.noTechStack", "No tech stack")}
          </span>
        );

      return (
        <div className="projects-table__techstack-col">
          {stack.map((tech) => (
            <Tag
              key={tech.id}
              variant="default"
              size="sm"
              onDismiss={
                processingId === project.id
                  ? undefined
                  : () => onUnlinkTech(project.id, tech.id)
              }
              disabled={processingId === project.id}
              style={
                tech.color
                  ? {
                      borderColor: `${tech.color}40`,
                      color: tech.color,
                      backgroundColor: `${tech.color}10`,
                    }
                  : {}
              }
            >
              {tech.name}
            </Tag>
          ))}
        </div>
      );
    },
  },
  {
    key: "actions",
    header: t("admin.projects.table.actions", "Actions"),
    align: "right",
    width: "10%",
    render: (project) => (
      <div
        className="projects-table__actions"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="ghost"
          size="sm"
          isIcon
          onClick={() => onEdit(project)}
          title={t("common.edit", "Edit")}
          disabled={processingId === project.id}
        >
          <Edit2 size={14} />
        </Button>
        <Button
          variant="danger"
          size="sm"
          isIcon
          onClick={() => onDelete(project.id)}
          isLoading={processingId === project.id}
          title={t("common.delete", "Delete")}
        >
          <Trash2 size={14} />
        </Button>
      </div>
    ),
  },
];
