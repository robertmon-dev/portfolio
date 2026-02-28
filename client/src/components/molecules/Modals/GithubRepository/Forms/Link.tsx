import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Button } from "@/components/atoms/Button/Button";
import { Link, AlertCircle } from "lucide-react";
import type { LinkFormProps } from '../types';
import "../GithubRepositoryModal.scss"


export const GithubLinkForm = ({ repo, projects, onSubmit, isLoading }: LinkFormProps) => {
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState<string>(repo.project?.id ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedId) onSubmit(selectedId);
  };

  return (
    <form className="github-form" onSubmit={handleSubmit}>
      <p className="github-form__help">
        {t("admin.github.link.help", {
          defaultValue: "Connect {{name}} to one of your existing portfolio projects to display sync data.",
          name: repo.name
        })}
      </p>

      <div className="github-form__group">
        <label className="github-form__label">
          {t("admin.github.link.label", "Select Project")}
        </label>
        <select
          className="github-form__select"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          required
        >
          <option value="" disabled>
            {t("admin.github.link.placeholder", "Choose a project...")}
          </option>
          {projects.map(project => (
            <option key={project.id} value={project.id}>
              {project.title}
            </option>
          ))}
        </select>
      </div>

      {projects.length === 0 && (
        <div className="github-form__alert">
          <AlertCircle size={18} />
          <span>{t("admin.github.link.noProjects", "No projects found. Create a project first.")}</span>
        </div>
      )}

      <div className="github-form__footer">
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          disabled={!selectedId || projects.length === 0}
          leftIcon={<Link size={18} />}
        >
          {t("admin.github.link.submit", "Link")}
        </Button>
      </div>
    </form>
  );
};
