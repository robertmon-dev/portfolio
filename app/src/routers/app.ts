import { router } from "../trpc/init";
import { githubCommitPublicRouter } from "./public/commits";
import { githubRepoPublicRouter } from "./public/githubRepo";
import { githubStatsPublicRouter } from "./public/githubStats";
import { projectsRouter } from "./public/projects";
import { diagnosticsRouter } from "./diagnostics/health";
import { contactPublicRouter } from "./public/mail";
import { authRouter } from "./public/auth";
import { authPrivateRouter } from "./private/auth";
import { projectPrivateRouter } from "./private/projects";
import { githubPrivateRouter } from "./private/github";
import { techStackPrivateRouter } from "./private/techStack";
import { techStackPublicRouter } from "./public/techStack";
import { usersPrivateRouter } from "./private/user";
import { usersRouter } from "./public/user";
import { experiencePrivateRouter } from "./private/experience";
import { experiencePublicRouter } from "./public/experience";
import { postsPrivateRouter } from "./private/posts";
import { postsRouter } from "./public/posts";
import { commentsRouter } from "./public/comments";
import { commentsPrivateRouter } from "./private/comments";
import { reactionsRouter } from "./public/reaction";
import { reactionsPrivateRouter } from "./private/reaction";
import { tagsRouter } from "./public/tag";
import { tagsPrivateRouter } from "./private/tag";
import { categoryRouter } from "./public/router";

export const appRouter = router({
  diagnostics: diagnosticsRouter,
  categories: categoryRouter,
  auth: authRouter,
  projects: projectsRouter,
  githubCommit: githubCommitPublicRouter,
  githubStats: githubStatsPublicRouter,
  githubRepo: githubRepoPublicRouter,
  account: authPrivateRouter,
  contact: contactPublicRouter,
  techStack: techStackPublicRouter,
  experience: experiencePublicRouter,
  users: usersRouter,
  posts: postsRouter,
  comments: commentsRouter,
  reactions: reactionsRouter,
  tags: tagsRouter,

  admin: router({
    projects: projectPrivateRouter,
    github: githubPrivateRouter,
    techStack: techStackPrivateRouter,
    users: usersPrivateRouter,
    experience: experiencePrivateRouter,
    posts: postsPrivateRouter,
    comments: commentsPrivateRouter,
    reactions: reactionsPrivateRouter,
    tags: tagsPrivateRouter,
  }),
});

export type AppRouter = typeof appRouter;
