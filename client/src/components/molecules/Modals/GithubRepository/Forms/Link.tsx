import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Button } from "@/components/atoms/Button/Button";
import { Select } from "@/components/atoms/Select/Select";
import { Link, AlertCircle, Layout } from "lucide-react";
import type { LinkFormProps } from '../types';
import '../GithubRepositoryModal.scss'

export const GithubLinkForm = ({ repo, projects, onSubmit, isLoading }: LinkFormProps) => {
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState<string>(repo.project?.id ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedId) onSubmit(selectedId);
  };

  const projectOptions = projects.map(p => ({
    value: p.id,
    label: p.title
  }));

  return (
    <form className="github-form" onSubmit={handleSubmit}>
      <p className="github-form__help">
        {t("admin.github.link.help", { name: repo.name })}
      </p>

      <div className="github-form__group">
        <Select
          label={t("admin.github.link.label", "Select Project")}
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          options={projectOptions}
          placeholder={t("admin.github.link.placeholder", "Choose a project...")}
          leftIcon={<Layout size={18} />}
          fullWidth
          required
          disabled={isLoading || projects.length === 0}
        />
      </div>

      {projects.length === 0 && (
        <div className="github-form__alert">
          <AlertCircle size={18} />
          <span>{t("admin.github.link.noProjects")}</span>
        </div>
      )}

      <div className="github-form__footer">
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          disabled={!selectedId || projects.length === 0}
          leftIcon={<Link size={18} />}
          fullWidth
        >
          {t("admin.github.link.submit")}
        </Button>
      </div>
    </form>
  );
};
