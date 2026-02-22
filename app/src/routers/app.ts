import { router } from '../trpc/init';
import { githubRepoPublicRouter } from './public/githubRepo';
import { githubStatsPublicRouter } from './public/githubStats';
import { projectsRouter } from './public/projects';
import { healthRouter } from './diagnostics/health';

export const appRouter = router({
  diagnostics: healthRouter,

  githubStats: githubStatsPublicRouter,
  githubRepo: githubRepoPublicRouter,
  projects: projectsRouter,

  admin: router({
  }),
});

export type AppRouter = typeof appRouter;
