import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Info, Tag, Layout } from "lucide-react";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { TextArea } from "@/components/atoms/TextArea/TextArea";
import {
  UpdateGithubRepoInputSchema,
  type UpdateGithubRepoInput,
} from "@portfolio/shared";
import type { UpdateFormProps } from "../types";
import "../GithubRepositoryModal.scss";

export const GithubUpdateForm = ({
  repo,
  onSubmit,
  isLoading,
}: UpdateFormProps) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateGithubRepoInput>({
    resolver: zodResolver(UpdateGithubRepoInputSchema),
    defaultValues: {
      id: repo.id,
      name: repo.name,
      description: repo.description ?? "",
      stars: repo.stars,
      language: repo.language ?? "",
    },
  });

  return (
    <form className="github-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="github-form__grid">
        <Input
          {...register("name")}
          label={t("admin.github.update.fields.name.label", "Repository Name")}
          error={errors.name?.message}
          leftIcon={<Tag size={18} />}
          fullWidth
          required
          disabled={isLoading}
        />

        <Input
          {...register("language")}
          label={t(
            "admin.github.update.fields.language.label",
            "Primary Language",
          )}
          error={errors.language?.message}
          leftIcon={<Layout size={18} />}
          fullWidth
          disabled={isLoading}
        />

        <TextArea
          {...register("description")}
          label={t(
            "admin.github.update.fields.description.label",
            "Description",
          )}
          error={errors.description?.message}
          rows={4}
          fullWidth
          disabled={isLoading}
        />
      </div>

      <div className="github-form__footer">
        <div className="github-form__info">
          <Info size={14} />
          <span>
            {t(
              "admin.github.update.info",
              "Note: These changes only affect how the repository is displayed in your portfolio, not the original GitHub data.",
            )}
          </span>
        </div>
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          leftIcon={<Save size={18} />}
          fullWidth
        >
          {t("admin.github.update.submit", "Save Changes")}
        </Button>
      </div>
    </form>
  );
};
