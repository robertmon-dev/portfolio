import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { TextArea } from "@/components/atoms/TextArea/TextArea";
import { Save, Info, Tag, Layout } from "lucide-react";
import type { UpdateGithubRepoInput } from "@portfolio/shared";
import type { UpdateFormProps } from "../types";
import "../GithubRepositoryModal.scss";

export const GithubUpdateForm = ({
  repo,
  onSubmit,
  isLoading,
}: UpdateFormProps) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<UpdateGithubRepoInput>({
    id: repo.id,
    name: repo.name,
    description: repo.description ?? "",
    stars: repo.stars,
    language: repo.language ?? "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="github-form" onSubmit={handleSubmit}>
      <div className="github-form__grid">
        <Input
          label={t("admin.github.update.fields.name.label")}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          leftIcon={<Tag size={18} />}
          fullWidth
          required
          disabled={isLoading}
        />

        <Input
          label={t("admin.github.update.fields.language.label")}
          value={formData.language ?? ""}
          onChange={(e) =>
            setFormData({ ...formData, language: e.target.value })
          }
          leftIcon={<Layout size={18} />}
          fullWidth
          disabled={isLoading}
        />

        <TextArea
          label={t("admin.github.update.fields.description.label")}
          value={formData.description ?? ""}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={4}
          fullWidth
          disabled={isLoading}
        />
      </div>

      <div className="github-form__footer">
        <div className="github-form__info">
          <Info size={14} />
          <span>{t("admin.github.update.info")}</span>
        </div>
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          leftIcon={<Save size={18} />}
          fullWidth
        >
          {t("admin.github.update.submit")}
        </Button>
      </div>
    </form>
  );
};
