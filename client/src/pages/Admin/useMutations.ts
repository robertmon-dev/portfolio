import { trpc } from '../../lib/trpc/client';

export const useGithubMutations = () => {
  return {
    update: trpc.admin.github.update.useMutation(),
    linkProject: trpc.admin.github.linkProject.useMutation(),
    delete: trpc.admin.github.delete.useMutation(),
  };
};

export const useProjectMutations = () => {
  return {
    create: trpc.admin.projects.create.useMutation(),
    update: trpc.admin.projects.update.useMutation(),
    delete: trpc.admin.projects.delete.useMutation(),
  };
};

export type GithubMutations = ReturnType<typeof useGithubMutations>;
export type ProjectMutations = ReturnType<typeof useProjectMutations>;

