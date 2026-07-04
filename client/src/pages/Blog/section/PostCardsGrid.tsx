import { EntityGrid } from "@/components/molecules/EntityGrid/EntityGrid";
import { PostCardListItem } from "../components/BlogCard/PostCardListItem";
import type { PostGridProps } from "./types";
import "./PostGrid.scss";

export const PostGrid = ({ posts, isLoading }: PostGridProps) => {
  return (
    <EntityGrid
      data={posts}
      isLoading={isLoading}
      columns={{ default: 1, md: 2, lg: 2 }}
      gap="1.5rem"
      loadingItemsCount={4}
      className="post-grid"
      renderItem={(post) => (
        <PostCardListItem post={post} index={posts.indexOf(post)} />
      )}
    />
  );
};
