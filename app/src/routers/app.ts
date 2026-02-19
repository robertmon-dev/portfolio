import { router } from '../trpc/init';
import { githubPublicRouter } from './public/github';
import { projectsRouter } from './public/projects';
import { healthRouter } from './diagnostics/health';

export const appRouter = router({
  diagnostics: healthRouter,

  github: githubPublicRouter,
  projects: projectsRouter,

  admin: router({
  }),
});

export type AppRouter = typeof appRouter;
