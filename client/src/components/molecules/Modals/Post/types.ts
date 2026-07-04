import type { Post, CreatePostInput } from "@portfolio/shared";
import type { PostAdminActions } from "@/pages/Admin/posts/types";

export interface PostFormProps {
  initialData?: Post | null;
  onSubmit: (data: CreatePostInput) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export interface PostModalsProps {
  state: PostAdminActions["state"];
  actions: PostAdminActions["actions"];
}
