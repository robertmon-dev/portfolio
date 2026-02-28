import { router } from '../trpc/init';
import { githubRepoPublicRouter } from './public/githubRepo';
import { githubStatsPublicRouter } from './public/githubStats';
import { projectsRouter } from './public/projects';
import { diagnosticsRouter } from './diagnostics/health';
import { authRouter } from './public/auth';
import { authPrivateRouter } from './private/auth';
import { projectPrivateRouter } from './private/projects';
import { githubPrivateRouter } from './private/github';
import { techStackPrivateRouter } from './private/techStack';
import { techStackPublicRouter } from './public/techStack';
import { usersRouter } from './private/user';
import { experiencePrivateRouter } from './private/experience';
import { experiencePublicRouter } from './public/experience';

export const appRouter = router({
  diagnostics: diagnosticsRouter,
  auth: authRouter,
  projects: projectsRouter,
  githubStats: githubStatsPublicRouter,
  githubRepo: githubRepoPublicRouter,
  account: authPrivateRouter,
  techStack: techStackPublicRouter,
  experience: experiencePublicRouter,

  admin: router({
    projects: projectPrivateRouter,
    github: githubPrivateRouter,
    techStack: techStackPrivateRouter,
    users: usersRouter,
    experience: experiencePrivateRouter
  }),
});

export type AppRouter = typeof appRouter;
