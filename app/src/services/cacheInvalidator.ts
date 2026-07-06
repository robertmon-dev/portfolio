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
import type { Invalidating } from "./types";
import type { Logging } from "../core/logger/types";
import type { Caching } from "../infrastructure/cache/types";
import type { Settings } from "../core/settings/settings";
import type { TagWithRelations } from "./tag/types";

export class CacheInvalidator implements Invalidating {
  public constructor(
    private readonly logger: Logging,
    private readonly cache: Caching,
    private readonly settings: Settings["config"],
  ) {}

  private async multiDel(keys: string[]) {
    try {
      await Promise.all(keys.map((key) => this.cache.del(key)));
    } catch (error) {
      this.logger.error(
        `Cache invalidation failed for keys: ${keys.join(", ")}`,
        error,
      );
    }
  }

  public async invalidateUserCache(
    ...users: (Partial<User> | null | undefined)[]
  ) {
    const keys = new Set<string>(["users:list:all", "users:list:*"]);

    users.forEach((user) => {
      if (!user) return;

      if (user.username === this.settings.ROOT_USERNAME) {
        keys.add(`user:public:root`);
      }

      if (user.id) {
        keys.add(`user:profile:${user.id}`);
        keys.add(`user:auth:${user.id}`);
      }

      if (user.email) keys.add(`user:profile:${user.email}`);
      if (user.username) keys.add(`user:profile:${user.username}`);
    });

    await this.multiDel(Array.from(keys));
  }

  public async invalidateProjectCache(
    ...projects: (Partial<Project> | null | undefined)[]
  ) {
    const keys = new Set<string>(["projects:list:*"]);

    projects.forEach((project) => {
      if (!project) return;
      if (project.id) keys.add(`projects:id:${project.id}`);
      if (project.slug) keys.add(`project:slug:${project.slug}`);
    });

    await this.multiDel(Array.from(keys));
  }

  public async invalidateTechStackCache(
    ...stacks: (Partial<TechStack> | null | undefined)[]
  ) {
    const keys = new Set<string>(["techstack:list:*", "projects:list:*"]);

    stacks.forEach((stack) => {
      if (!stack) return;
      if (stack.id) keys.add(`techstack:id:${stack.id}`);
    });

    await this.multiDel(Array.from(keys));
  }

  public async invalidateGithubCache(
    ...repos: (Partial<GithubRepo> | null | undefined)[]
  ) {
    const keys = new Set<string>([
      "github:commit:list:all",
      "github:commit:list:*",
      "github:repos:list:all",
      "github:repos:*",
      "github:stats:*",
      "projects:list:*",
    ]);

    repos.forEach((repo) => {
      if (!repo) return;
      if (repo.id) keys.add(`github:repo:id:${repo.id}`);
    });

    await this.multiDel(Array.from(keys));
  }

  public async invalidateCommitsCache(
    ...commits: (Partial<GithubCommit> | null | undefined)[]
  ) {
    const keys = new Set<string>([
      "github:commit:list:all",
      "github:commit:list:*",
      "github:repos:list:all",
      "github:repos:*",
      "github:stats:*",
    ]);

    commits.forEach((commit) => {
      if (!commit) return;
      if (commit.id) keys.add(`github:commit:id:${commit.id}`);
      if (commit.repoId) keys.add(`github:repo:id:${commit.repoId}`);
    });

    await this.multiDel(Array.from(keys));
  }

  public async invalidateExperienceCache(
    ...experiences: (Partial<Experience> | null | undefined)[]
  ) {
    const keys = new Set<string>(["experience:list:*"]);

    experiences.forEach((exp) => {
      if (!exp) return;
      if (exp.id) keys.add(`experience:id:${exp.id}`);
    });

    await this.multiDel(Array.from(keys));
  }

  public async invalidatePostCache(
    ...posts: (Partial<Post> | null | undefined)[]
  ) {
    const keys = new Set<string>(["posts:list:*", "posts:list:both:*"]);

    posts.forEach((post) => {
      if (!post) return;
      if (post.id) {
        keys.add(`post:id:${post.id}`);
        keys.add(`comments:post:id:${post.id}`);
      }
      if (post.slug) keys.add(`post:slug:${post.slug}`);
    });

    await this.multiDel(Array.from(keys));
  }

  public async invalidateCommentsCache(
    ...comments: (Partial<Comment> | null | undefined)[]
  ) {
    const keys = new Set([
      "comments:list:*",
      "comments:list:both:*",
      "comments:list:post:both:*",
      "comments:list:post:*",
      "comments:list:parent:*",
      "comments:list:parent:both:*",
    ]);

    comments.forEach((comment) => {
      if (!comment) return;
      if (comment.id) {
        keys.add(`comments:id:${comment.id}`);
      }
      if (comment.postId) {
        keys.add(`comments:post:id:${comment.postId}`);
        keys.add(`posts:id:${comment.postId}`);
      }
    });

    await this.multiDel(Array.from(keys));
  }

  public async invalidateReactionsCache(
    ...reactions: (Partial<Reaction> | null | undefined)[]
  ): Promise<void> {
    const keys = new Set([
      "reaction:list:*",
      "reaction:list:both:*",
      "reaction:list:comment:*",
      "reaction:list:post:*",
    ]);

    reactions.forEach((reaction) => {
      if (!reaction) return;

      if (reaction.id) {
        keys.add(`reactions:id:${reaction.id}`);
      }

      if (reaction.postId) {
        keys.add(`posts:id:${reaction.postId}`);
      }

      if (reaction.commentId) {
        keys.add(`comments:id:${reaction.commentId}`);
      }
    });

    await this.multiDel(Array.from(keys));
  }

  public async invalidateTagsCache(
    ...tags: Partial<TagWithRelations | null | undefined>[]
  ): Promise<void> {
    const keys = new Set(["tags:list:*", "tags:list:category:*"]);

    tags.forEach((tag) => {
      if (!tag) return;

      if (tag.id) {
        keys.add(`tags:id:${tag.id}`);
      }

      if (tag.categoryId) {
        keys.add(`category:id:${tag.categoryId}`);
      }

      if (tag.posts) {
        tag.posts.forEach((post) => {
          keys.add(`posts:id:${post.id}`);
        });
      }
    });

    await this.multiDel(Array.from(keys));
  }

  public async invalidateCategoriesCache(
    ...categories: Partial<TagCategory | null | undefined>[]
  ): Promise<void> {
    const keys = new Set(["categories:list:*"]);

    categories.forEach((category) => {
      if (!category) return;

      if (category.id) {
        keys.add(`category:id:${category.id}`);
      }
    });

    await this.multiDel(Array.from(keys));
  }
}
