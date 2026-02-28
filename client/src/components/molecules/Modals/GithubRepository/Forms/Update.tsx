import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/atoms/Button/Button";
import { Save, Info } from "lucide-react";
import type { UpdateGithubRepoInput } from "@portfolio/shared";
import type { UpdateFormProps } from '../types';
import "../GithubRepositoryModal.scss"

export const GithubUpdateForm = ({ repo, onSubmit, isLoading }: UpdateFormProps) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<UpdateGithubRepoInput>({
    name: repo.name,
    description: repo.description ?? "",
    stars: repo.stars,
    language: repo.language ?? ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="github-form" onSubmit={handleSubmit}>
      <div className="github-form__group">
        <label className="github-form__label">
          {t("admin.github.update.fields.name.label", "Display Name")}
        </label>
        <input
          className="github-form__input"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          placeholder={t("admin.github.update.fields.name.placeholder", "Repository name...")}
          required
        />
      </div>

      <div className="github-form__group">
        <label className="github-form__label">
          {t("admin.github.update.fields.language.label", "Language")}
        </label>
        <input
          className="github-form__input"
          value={formData.language ?? ""}
          onChange={e => setFormData({ ...formData, language: e.target.value })}
          placeholder={t("admin.github.update.fields.language.placeholder", "e.g. TypeScript")}
        />
      </div>

      <div className="github-form__group">
        <label className="github-form__label">
          {t("admin.github.update.fields.description.label", "Description")}
        </label>
        <textarea
          className="github-form__textarea"
          value={formData.description ?? ""}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          placeholder={t("admin.github.update.fields.description.placeholder", "Enter repo description...")}
        />
      </div>

      <div className="github-form__footer">
        <div className="github-form__info">
          <Info size={14} />
          <span>{t("admin.github.update.info", "Updates local database only")}</span>
        </div>
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          leftIcon={<Save size={18} />}
        >
          {t("admin.github.update.submit", "Update")}
        </Button>
      </div>
    </form>
  );
};
