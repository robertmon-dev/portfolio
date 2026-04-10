import {
  Experience,
  PrismaClient,
  User,
  Project,
  TechStack,
  GithubRepo,
  GithubCommit,
} from "@prisma/client";
import type { Logging } from "../core/logger/types";
import type { Caching } from "../infrastructure/cache/types";
import type { Settings } from "../core/settings/settings";

export abstract class BaseService {
  constructor(
    protected readonly db: PrismaClient,
    protected readonly cache: Caching,
    protected readonly logger: Logging,
    protected readonly settings: Settings["config"],
  ) {}

  protected async invalidateUserCache(
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

  protected async invalidateProjectCache(
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

  protected async invalidateTechStackCache(
    ...stacks: (Partial<TechStack> | null | undefined)[]
  ) {
    const keys = new Set<string>(["techstack:list:*", "projects:list:*"]);

    stacks.forEach((stack) => {
      if (!stack) return;
      if (stack.id) keys.add(`techstack:id:${stack.id}`);
    });

    await this.multiDel(Array.from(keys));
  }

  protected async invalidateGithubCache(
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

  protected async invalidateCommitsCache(
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

  protected async invalidateExperienceCache(
    ...experiences: (Partial<Experience> | null | undefined)[]
  ) {
    const keys = new Set<string>(["experience:list:*"]);

    experiences.forEach((exp) => {
      if (!exp) return;
      if (exp.id) keys.add(`experience:id:${exp.id}`);
    });

    await this.multiDel(Array.from(keys));
  }

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
}
