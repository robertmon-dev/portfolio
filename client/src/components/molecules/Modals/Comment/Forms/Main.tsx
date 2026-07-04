import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/atoms/Button/Button";
import { TextArea } from "@/components/atoms/TextArea/TextArea";
import type { CommentFormProps } from "../types";
import "../CommentModal.scss";

export const CommentForm = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}: CommentFormProps) => {
  const { t } = useTranslation();
  const [content, setContent] = useState(initialData?.content ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = content.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <TextArea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        label={t("admin.comments.form.content.label", "Content")}
        rows={5}
        fullWidth
        disabled={isLoading}
      />

      <div className="comment-form__actions">
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
          disabled={!content.trim()}
        >
          {t("common.save", "Save Changes")}
        </Button>
      </div>
    </form>
  );
};
