import { useTranslation } from "react-i18next";
import { Link, AlertCircle, Layout } from "lucide-react";
import { Button } from "@/components/atoms/Button/Button";
import { Select } from "@/components/atoms/Select/Select";
import { useGithubLinkRepoForm } from "./hooks/useLink";
import type { LinkFormProps } from "../types";
import "../GithubRepositoryModal.scss";

export const GithubLinkForm = (props: LinkFormProps) => {
  const { repo, projects, isLoading } = props;
  const { t } = useTranslation();

  const { register, errors, handleSubmit } = useGithubLinkRepoForm(props);

  const projectOptions = projects.map((p) => ({
    value: p.id,
    label: p.title,
  }));

  return (
    <form className="github-form" onSubmit={handleSubmit}>
      <p className="github-form__help">
        {t("admin.github.link.help", { name: repo.name })}
      </p>

      <div className="github-form__group">
        <Select
          {...register("projectId")}
          label={t("admin.github.link.label", "Select Project")}
          error={errors.projectId?.message}
          options={projectOptions}
          placeholder={t(
            "admin.github.link.placeholder",
            "Choose a project...",
          )}
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
          disabled={projects.length === 0}
          leftIcon={<Link size={18} />}
          fullWidth
        >
          {t("admin.github.link.submit")}
        </Button>
      </div>
    </form>
  );
};
