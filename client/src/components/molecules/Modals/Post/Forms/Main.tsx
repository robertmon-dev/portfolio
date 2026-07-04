import { useTranslation } from "react-i18next";
import { Type, Link, Image as ImageIcon, Shield } from "lucide-react";
import { RoleEnum } from "@portfolio/shared";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { TextArea } from "@/components/atoms/TextArea/TextArea";
import { Checkbox } from "@/components/atoms/CheckBox/CheckBox";
import { Select } from "@/components/atoms/Select/Select";
import { usePostForm } from "./usePostForm";
import type { PostFormProps } from "../types";
import "../PostModal.scss";

export const PostForm = (props: PostFormProps) => {
  const { t } = useTranslation();
  const { isLoading, initialData, onCancel } = props;

  const { register, errors, handleSubmit, watch, setValue } =
    usePostForm(props);

  const visibility = watch("visibility");
  const publishedAt = watch("publishedAt");

  const visibilityOptions = RoleEnum.options.map((role) => ({
    value: role,
    label: t(`admin.posts.form.visibility.options.${role}`, role),
  }));

  return (
    <form onSubmit={(e) => void handleSubmit(e)} className="post-form">
      <div className="post-form__grid">
        <Input
          {...register("title")}
          label={t("admin.posts.form.title.label", "Title")}
          error={errors.title?.message}
          leftIcon={<Type size={18} />}
          fullWidth
          required
          disabled={isLoading}
        />

        <Input
          {...register("slug")}
          label={t("admin.posts.form.slug.label", "Slug")}
          error={errors.slug?.message}
          leftIcon={<Link size={18} />}
          fullWidth
          disabled={!!initialData || isLoading}
        />

        <Input
          {...register("subtitle")}
          label={t("admin.posts.form.subtitle.label", "Subtitle")}
          error={errors.subtitle?.message}
          fullWidth
          disabled={isLoading}
        />

        <TextArea
          {...register("excerpt")}
          label={t("admin.posts.form.excerpt.label", "Excerpt")}
          error={errors.excerpt?.message}
          fullWidth
          disabled={isLoading}
          rows={2}
        />

        <TextArea
          {...register("content")}
          label={t("admin.posts.form.content.label", "Content")}
          error={errors.content?.message}
          fullWidth
          disabled={isLoading}
          rows={8}
          className="post-form__content-field"
        />

        <TextArea
          {...register("footer")}
          label={t("admin.posts.form.footer.label", "Footer")}
          error={errors.footer?.message}
          fullWidth
          disabled={isLoading}
          rows={2}
        />

        <div className="grid-row-dual">
          <Input
            {...register("coverImageUrl")}
            label={t("admin.posts.form.coverImageUrl.label", "Cover image URL")}
            error={errors.coverImageUrl?.message}
            leftIcon={<ImageIcon size={18} />}
            fullWidth
            disabled={isLoading}
          />

          <Select
            label={t("admin.posts.form.visibility.label", "Visibility")}
            options={visibilityOptions}
            value={visibility}
            onChange={(e) =>
              setValue("visibility", e.target.value as typeof visibility)
            }
            error={errors.visibility?.message}
            leftIcon={<Shield size={18} />}
            fullWidth
            disabled={isLoading}
          />
        </div>

        <div className="post-form__toggles">
          <Checkbox
            label={t("admin.posts.form.published", "Published")}
            checked={!!publishedAt}
            onChange={(e) =>
              setValue(
                "publishedAt",
                e.target.checked ? new Date().toISOString() : null,
              )
            }
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="post-form__actions">
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
            : t("common.create", "Create Post")}
        </Button>
      </div>
    </form>
  );
};
