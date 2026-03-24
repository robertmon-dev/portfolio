import { useTranslation } from "react-i18next";
import { Layout, Link, Image as ImageIcon, Globe } from "lucide-react";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { TextArea } from "@/components/atoms/TextArea/TextArea";
import { Checkbox } from "@/components/atoms/CheckBox/CheckBox";
import { useProjectForm } from "./useProjectForm";
import type { ProjectFormProps } from "../types";
import "../ProjectModal.scss";

export const ProjectForm = (props: ProjectFormProps) => {
  const { t } = useTranslation();
  const { isLoading, initialData, onCancel } = props;

  const { register, errors, handleSubmit, watch, setValue } =
    useProjectForm(props);

  const isFeatured = watch("isFeatured");
  const isVisible = watch("isVisible");

  return (
    <form onSubmit={handleSubmit} className="project-form">
      <div className="project-form__grid">
        <Input
          {...register("title")}
          label={t("admin.projects.form.title.label")}
          error={errors.title?.message}
          leftIcon={<Layout size={18} />}
          fullWidth
          required
          disabled={isLoading}
        />

        <Input
          {...register("slug")}
          label={t("admin.projects.form.slug.label")}
          error={errors.slug?.message}
          leftIcon={<Link size={18} />}
          fullWidth
          disabled={!!initialData || isLoading}
        />

        <TextArea
          {...register("description")}
          label={t("admin.projects.form.description.label")}
          error={errors.description?.message}
          fullWidth
          disabled={isLoading}
          rows={3}
        />

        <TextArea
          {...register("content")}
          label={t("admin.projects.form.content.label", "Content")}
          error={errors.content?.message}
          fullWidth
          disabled={isLoading}
          rows={6}
          className="project-form__content-field"
        />

        <div className="grid-row-dual">
          <Input
            {...register("imageUrl")}
            label={t("admin.projects.form.imageUrl.label")}
            error={errors.imageUrl?.message}
            leftIcon={<ImageIcon size={18} />}
            fullWidth
            disabled={isLoading}
          />
          <Input
            {...register("demoUrl")}
            label={t("admin.projects.form.demoUrl.label")}
            error={errors.demoUrl?.message}
            leftIcon={<Globe size={18} />}
            fullWidth
            disabled={isLoading}
          />
        </div>

        <div className="project-form__toggles">
          <Checkbox
            label={t("admin.projects.form.isFeatured")}
            checked={isFeatured}
            onChange={(e) => setValue("isFeatured", e.target.checked)}
            disabled={isLoading}
          />
          <Checkbox
            label={t("admin.projects.form.isVisible")}
            checked={isVisible}
            onChange={(e) => setValue("isVisible", e.target.checked)}
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="project-form__actions">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={isLoading}
        >
          {t("common.cancel", "Cancel")}
        </Button>
        <Button type="submit" variant="primary" isLoading={isLoading}>
          {initialData
            ? t("common.save", "Save Changes")
            : t("common.create", "Create Project")}
        </Button>
      </div>
    </form>
  );
};
