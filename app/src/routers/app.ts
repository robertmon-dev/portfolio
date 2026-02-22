import { router } from '../trpc/init';
import { githubRepoPublicRouter } from './public/githubRepo';
import { githubStatsPublicRouter } from './public/githubStats';
import { projectsRouter } from './public/projects';
import { healthRouter } from './diagnostics/health';
import { authRouter } from './public/auth';
import { authPrivateRouter } from './private/auth';
import { projectPrivateRouter } from './private/projects';
import { githubPrivateRouter } from './private/github';

export const appRouter = router({
  diagnostics: healthRouter,
  auth: authRouter,
  projects: projectsRouter,
  githubStats: githubStatsPublicRouter,
  githubRepo: githubRepoPublicRouter,
  account: authPrivateRouter,

  admin: router({
    projects: projectPrivateRouter,
    github: githubPrivateRouter
  }),
});

export type AppRouter = typeof appRouter;
