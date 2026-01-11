import { router } from '../trpc/init';
import { githubRouter } from './public/github';
import { projectsRouter } from './public/projects';
import { healthRouter } from './diagnostics/health';

export const appRouter = router({
  diagnostics: healthRouter,

  github: githubRouter,
  projects: projectsRouter,

  admin: router({
  }),
});

export type AppRouter = typeof appRouter;
