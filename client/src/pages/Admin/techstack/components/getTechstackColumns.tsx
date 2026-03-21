import { Column } from "@/components/molecules/EntityTable/types";
import { Tag } from "@/components/atoms/Tag/Tag";
import { Button } from "@/components/atoms/Button/Button";
import { Trash2, Edit2, Layers } from "lucide-react";
import { TechStackWithRelations } from "@portfolio/shared";

export const getTechStackColumns = (
  onEdit: (techStack: TechStackWithRelations) => void,
  onDelete: (id: string) => void,
  processingId: string | null
): Column<TechStackWithRelations>[] => [
    {
      key: "name",
      header: "Technology Name",
      width: "40%",
      render: (techStack) => (
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-md bg-tn-surface-light flex items-center justify-center text-primary opacity-80">
            <Layers size={16} />
          </div>
          <span className="font-bold text-sm">{techStack.name}</span>
        </div>
      ),
    },
    {
      key: "usage",
      header: "Linked Projects",
      width: "30%",
      align: "center",
      render: (techStack) => {
        const count = techStack.projects?.length || 0;

        return (
          <Tag variant={count > 0 ? "info" : "default"} size="sm">
            {count} {count === 1 ? 'Project' : 'Projects'}
          </Tag>
        );
      },
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (techStack) => (
        <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(techStack)}
            isIcon
            title="Edit Technology"
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
