import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, AlertCircle, Layout } from "lucide-react";
import { Button } from "@/components/atoms/Button/Button";
import { Controller } from "react-hook-form";
import { Select } from "@/components/atoms/Select/Select";
import { useGithubLinkRepoForm } from "./hooks/useLink";
import type { LinkFormProps } from "../types";
import "../GithubRepositoryModal.scss";

export const GithubLinkForm = (props: LinkFormProps) => {
  const { repo, projects, isLoading } = props;
  const { t } = useTranslation();

  const { control, errors, handleSubmit } = useGithubLinkRepoForm(props);

  const projectOptions = useMemo(
    () =>
      projects.map((p) => ({
        value: p.id,
        label: p.title,
      })),
    [projects],
  );

  return (
    <form className="github-form" onSubmit={handleSubmit}>
      <p className="github-form__help">
        {t("admin.github.link.help", {
          name: repo.name,
          defaultValue:
            "Select which project should be linked with {{name}} repository.",
        })}
      </p>

      <div className="github-form__group">
        <Controller
          name="projectId"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              label={t("admin.github.link.label", "Select Project")}
              error={errors.projectId?.message}
              options={projectOptions}
              placeholder={t(
                "admin.github.link.placeholder",
                "Choose a project to link...",
              )}
              leftIcon={<Layout size={18} />}
              fullWidth
              required
              disabled={isLoading || projects.length === 0}
            />
          )}
        />
      </div>

      {projects.length === 0 && (
        <div className="github-form__alert">
          <AlertCircle size={18} />
          <span>
            {t(
              "admin.github.link.noProjects",
              "No available projects found. Create a project first to link it with this repository.",
            )}
          </span>
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
          {t("admin.github.link.submit", "Link Repository")}
        </Button>
      </div>
    </form>
  );
};
