import type { Experience } from "@portfolio/shared";
import { Button } from "@/components/atoms/Button/Button";
import {
  Edit2,
  Trash2,
  Calendar,
  Clock,
  Briefcase,
  Building2,
  FileText,
  CheckCircle2,
  History,
} from "lucide-react";
import dayjs from "dayjs";
import type { Column } from "@/components/molecules/EntityTable/types";
import type { TFunction } from "i18next";
import { getTenure } from "@/lib/utils/date";

export const getExperienceColumns = (
  t: TFunction,
  onEdit: (exp: Experience) => void,
  onDelete: (id: string) => void,
  processingId: string | null,
): Column<Experience>[] => [
  {
    key: "position",
    header: t("admin.experience.table.position", "Position"),
    width: "20%",
    render: (item) => (
      <div className="experience-table__cell-with-icon">
        <div className="experience-table__icon-wrapper">
          <Briefcase size={14} />
        </div>
        <span className="experience-table__position">{item.position}</span>
      </div>
    ),
  },
  {
    key: "company",
    header: t("admin.experience.table.company", "Company"),
    width: "15%",
    render: (item) => (
      <div className="experience-table__cell-with-icon">
        <Building2 size={14} className="text-muted" />
        <span className="experience-table__company-name">{item.company}</span>
      </div>
    ),
  },
  {
    key: "duration",
    header: t("admin.experience.table.duration", "Duration"),
    width: "20%",
    render: (item) => {
      const start = dayjs(item.startDate).format("MM/YYYY");
      const end = item.isCurrent
        ? t("common.present")
        : dayjs(item.endDate).format("MM/YYYY");
      const tenure = getTenure(item.startDate, item.endDate, item.isCurrent, t);

      return (
        <div className="experience-table__duration-stack">
          <div className="experience-table__range">
            <Calendar size={12} />
            <span>
              {start} — {end}
            </span>
          </div>
          <div className="experience-table__tenure-badge">
            <Clock size={10} />
            <span>{tenure}</span>
          </div>
        </div>
      );
    },
  },
  {
    key: "description",
    header: t("admin.experience.table.description", "Description"),
    width: "15%",
    render: (item) => (
      <div className="experience-table__description-preview">
        <FileText size={12} />
        <p title={item.description}>{item.description}</p>
      </div>
    ),
  },
  {
    key: "status",
    header: t("admin.experience.table.status", "Status"),
    width: "10%",
    align: "center",
    render: (item) => (
      <div
        className={`experience-table__status-badge ${item.isCurrent ? "Active" : "Past"}`}
      >
        {item.isCurrent ? <CheckCircle2 size={12} /> : <History size={12} />}
        <span>
          {item.isCurrent
            ? t("common.current", "Current")
            : t("common.past", "Past")}
        </span>
      </div>
    ),
  },
  {
    key: "actions",
    header: t("admin.experience.table.actions", "Actions"),
    width: "10%",
    align: "right",
    render: (item) => (
      <div className="experience-table__actions">
        <Button
          variant="ghost"
          size="sm"
          isIcon={true}
          onClick={(e) => {
            e.stopPropagation();
            onEdit(item);
          }}
          disabled={!!processingId}
        >
          <Edit2 size={14} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          isIcon={true}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item.id);
          }}
          isLoading={processingId === item.id}
        >
          <Trash2 size={14} />
        </Button>
      </div>
    ),
  },
];
