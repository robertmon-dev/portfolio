import type { Comment } from "@portfolio/shared";
import type { CommentAdminActions } from "@/pages/Admin/comments/types";

export interface CommentFormProps {
  initialData?: Comment | null;
  onSubmit: (content: string) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export interface CommentModalsProps {
  state: CommentAdminActions["state"];
  actions: CommentAdminActions["actions"];
}
