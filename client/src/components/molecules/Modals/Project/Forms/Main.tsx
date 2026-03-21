import { useTranslation } from "react-i18next";
import { Layout, Link, Image as ImageIcon, Globe } from "lucide-react";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { TextArea } from "@/components/atoms/TextArea/TextArea";
import { Checkbox } from "@/components/atoms/CheckBox/CheckBox";
import { useProjectForm } from "./useProjectForm";
import type { ProjectFormProps } from "../types";
import '../ProjectModal.scss';

export const ProjectForm = (props: ProjectFormProps) => {
  const { t } = useTranslation();
  const { isLoading, initialData } = props;

  const {
    formData,
    errors,
    handleChange,
    handleSubmit,
    onCancel
  } = useProjectForm(props);

  return (
    <form onSubmit={handleSubmit} className="project-form">
      <div className="project-form__grid">
        <Input
          label={t("admin.projects.form.title.label")}
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          error={errors.title}
          leftIcon={<Layout size={18} />}
          fullWidth
          required
          disabled={isLoading}
        />

        <Input
          label={t("admin.projects.form.slug.label")}
          value={formData.slug}
          onChange={(e) => handleChange('slug', e.target.value)}
          error={errors.slug}
          leftIcon={<Link size={18} />}
          fullWidth
          disabled={!!initialData || isLoading}
        />

        <TextArea
          label={t("admin.projects.form.description.label")}
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          error={errors.description}
          fullWidth
          disabled={isLoading}
          rows={3}
        />

        <TextArea
          label={t("admin.projects.form.content.label", "Content")}
          value={formData.content}
          onChange={(e) => handleChange('content', e.target.value)}
          error={errors.content}
          fullWidth
          disabled={isLoading}
          rows={6}
          className="project-form__content-field"
        />

        <div className="grid-row-dual">
          <Input
            label={t("admin.projects.form.imageUrl.label")}
            value={formData.imageUrl}
            onChange={(e) => handleChange('imageUrl', e.target.value)}
            error={errors.imageUrl}
            leftIcon={<ImageIcon size={18} />}
            fullWidth
            disabled={isLoading}
          />
          <Input
            label={t("admin.projects.form.demoUrl.label")}
            value={formData.demoUrl}
            onChange={(e) => handleChange('demoUrl', e.target.value)}
            error={errors.demoUrl}
            leftIcon={<Globe size={18} />}
            fullWidth
            disabled={isLoading}
          />
        </div>

        <div className="project-form__toggles">
          <Checkbox
            label={t("admin.projects.form.isFeatured")}
            checked={formData.isFeatured}
            onChange={(e) => handleChange('isFeatured', e.target.checked)}
            disabled={isLoading}
          />
          <Checkbox
            label={t("admin.projects.form.isVisible")}
            checked={formData.isVisible}
            onChange={(e) => handleChange('isVisible', e.target.checked)}
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
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
        >
          {initialData ? t("common.save", "Save Changes") : t("common.create", "Create Project")}
        </Button>
      </div>
    </form>
  );
};
