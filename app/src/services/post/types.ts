import type { ListPostsInput } from "@portfolio/shared";

export interface ListPostsServiceInput extends ListPostsInput {
  includeDeleted: boolean;
}
