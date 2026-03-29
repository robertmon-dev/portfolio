import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "@/components/atoms/Alert/Alert";
import { Button } from "@/components/atoms/Button/Button";
import { Select } from "@/components/atoms/Select/Select";
import { Tag } from "@/components/atoms/Tag/Tag";
import { Link2, Layout, X, Info } from "lucide-react";
import type { LinkTechStackFormProps } from "../types";
import "../TechStackModal.scss";

export const LinkTechStackForm = ({
  techStack,
  projects,
  onSubmit,
  onUnlink,
  onCancel,
  isLoading,
}: LinkTechStackFormProps) => {
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState<string>("");

  const availableProjects = useMemo(
    () =>
      projects.filter(
        (p) => !techStack.projects.some((existing) => existing.id === p.id),
      ),
    [projects, techStack.projects],
  );

  const projectOptions = useMemo(
    () => availableProjects.map((p) => ({ value: p.id, label: p.title })),
    [availableProjects],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedId) {
      onSubmit(selectedId);
      setSelectedId("");
    }
  };

  return (
    <form className="tech-stack-form" onSubmit={handleSubmit}>
      <div className="tech-stack-form__section">
        <label className="tech-stack-form__label">
          <Info size={14} />
          {t("admin.techStack.link.current", "Currently Linked Projects")}
        </label>

        <div className="tech-stack-form__tags">
          {techStack.projects.length > 0 ? (
            techStack.projects.map((project) => (
              <Tag
                key={project.id}
                variant="info"
                size="sm"
                onDismiss={() => onUnlink(techStack.id, project.id)}
                disabled={isLoading}
              >
                {project.title}
              </Tag>
            ))
          ) : (
            <span className="tech-stack-form__empty">
              {t("admin.techStack.link.noCurrentLinks", "No linked projects")}
            </span>
          )}
        </div>
      </div>

      <div className="tech-stack-form__divider" />

      <p className="tech-stack-form__help">
        {t(
          "admin.techStack.link.help",
          "Link {{name}} to an existing project.",
          { name: techStack.name },
        )}
      </p>

      <div className="tech-stack-form__grid">
        <div className="full-width">
          <Select
            label={t("admin.techStack.link.label", "Select Project")}
            value={selectedId}
            onChange={(e) => setSelectedId(String(e.target.value))}
            options={projectOptions}
            placeholder={t(
              "admin.techStack.link.placeholder",
              "Select a project to link...",
            )}
            leftIcon={<Layout size={18} />}
            fullWidth
            disabled={isLoading || availableProjects.length === 0}
          />
        </div>
      </div>

      {availableProjects.length === 0 && projects.length > 0 && (
        <Alert variant="warning">
          {t(
            "admin.techStack.link.noAvailableProjects",
            "All available projects are already linked.",
          )}
        </Alert>
      )}

      <div className="tech-stack-form__actions">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={isLoading}
        >
          <X size={18} /> {t("common.cancel", "Cancel")}
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          disabled={!selectedId || availableProjects.length === 0}
          leftIcon={<Link2 size={18} />}
        >
          {t("admin.techStack.link.submit", "Link Project")}
        </Button>
      </div>
    </form>
  );
};
