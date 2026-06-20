import type {
  Experience,
  User,
  Project,
  TechStack,
  GithubRepo,
  GithubCommit,
  Post,
  Comment,
  Reaction,
  TagCategory,
} from "@prisma/client";
import type { TagWithRelations } from "./tag/types";

export interface Invalidating {
  invalidateUserCache(
    ...users: (Partial<User> | null | undefined)[]
  ): Promise<void>;
  invalidateProjectCache(
    ...projects: (Partial<Project> | null | undefined)[]
  ): Promise<void>;
  invalidateTechStackCache(
    ...stacks: (Partial<TechStack> | null | undefined)[]
  ): Promise<void>;
  invalidateGithubCache(
    ...repos: (Partial<GithubRepo> | null | undefined)[]
  ): Promise<void>;
  invalidateCommitsCache(
    ...commits: (Partial<GithubCommit> | null | undefined)[]
  ): Promise<void>;
  invalidateExperienceCache(
    ...experiences: (Partial<Experience> | null | undefined)[]
  ): Promise<void>;
  invalidatePostCache(
    ...posts: (Partial<Post> | null | undefined)[]
  ): Promise<void>;
  invalidateCommentsCache(
    ...comments: (Partial<Comment> | null | undefined)[]
  ): Promise<void>;
  invalidateReactionsCache(
    ...reactions: (Partial<Reaction> | null | undefined)[]
  ): Promise<void>;
  invalidateTagsCache(
    ...tags: Partial<TagWithRelations | null | undefined>[]
  ): Promise<void>;
  invalidateCategoriesCache(
    ...categories: Partial<TagCategory | null | undefined>[]
  ): Promise<void>;
}
