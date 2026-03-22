import type { CSSProperties } from "react";
import type { Column } from "@/components/molecules/EntityTable/types";
import { Tag } from "@/components/atoms/Tag/Tag";
import { Button } from "@/components/atoms/Button/Button";
import { Trash2, Edit2, Layers, Link2 } from "lucide-react";
import type { TechStackWithRelations } from "@portfolio/shared";

export const getTechStackColumns = (
  onEdit: (techStack: TechStackWithRelations) => void,
  onDelete: (id: string) => void,
  onLink: (techStack: TechStackWithRelations) => void,
  onUnlink: (techStackId: string, projectId: string) => void,
  processingId: string | null,
): Column<TechStackWithRelations>[] => [
  {
    key: "name",
    header: "Technology",
    width: "25%",
    render: (techStack) => (
      <div className="techstack-table__name-row">
        <Layers size={14} className="techstack-table__type-icon" />

        <span className="techstack-table__title" title={techStack.name}>
          {techStack.name}
        </span>

        <div
          className="techstack-table__gem"
          style={
            {
              ["--gem-color"]: techStack.color?.startsWith("#")
                ? techStack.color
                : `#${techStack.color}` || "var(--primary)",
            } as CSSProperties
          }
        />
      </div>
    ),
  },
  {
    key: "category",
    header: "Category",
    width: "15%",
    render: (techStack) => (
      <Tag variant="default" size="sm">
        {techStack.category}
      </Tag>
    ),
  },
  {
    key: "projects",
    header: "Linked Projects",
    width: "45%",
    render: (techStack) => (
      <div className="techstack-table__projects">
        {techStack.projects?.map((project) => (
          <Tag
            key={project.id}
            variant="info"
            size="sm"
            maxLength={15}
            disabled={processingId === techStack.id}
            onDismiss={
              processingId === techStack.id
                ? undefined
                : () => onUnlink(techStack.id, project.id)
            }
          >
            {project.title}
          </Tag>
        ))}

        {(!techStack.projects || techStack.projects.length === 0) && (
          <span className="techstack-table__empty">No projects linked</span>
        )}
      </div>
    ),
  },
  {
    key: "actions",
    header: "Actions",
    align: "right",
    render: (techStack) => (
      <div
        className="techstack-table__actions"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onLink(techStack)}
          isIcon
          title="Link Project"
          disabled={processingId === techStack.id}
        >
          <Link2 size={14} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(techStack)}
          isIcon
          title="Edit Technology"
          disabled={processingId === techStack.id}
        >
          <Edit2 size={14} />
        </Button>
        <Button
          variant="danger"
          size="sm"
          isIcon
          onClick={() => onDelete(techStack.id)}
          isLoading={processingId === techStack.id}
          title="Delete Technology"
        >
          <Trash2 size={14} />
        </Button>
      </div>
    ),
  },
];
