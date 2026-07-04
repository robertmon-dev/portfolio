import type { Post } from "@portfolio/shared";

export interface PostGridProps {
  posts: Post[];
  isLoading?: boolean;
}
