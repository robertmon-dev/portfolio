import { trpc } from "../../lib/trpc/client";

export const useGithubMutations = () => {
  return {
    update: trpc.admin.github.update.useMutation(),
    linkProject: trpc.admin.github.linkProject.useMutation(),
    unlinkProject: trpc.admin.github.unlinkProject.useMutation(),
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

export const useTechStackMutations = () => {
  return {
    create: trpc.admin.techStack.create.useMutation(),
    update: trpc.admin.techStack.update.useMutation(),
    delete: trpc.admin.techStack.delete.useMutation(),
    linkProject: trpc.admin.techStack.linkProject.useMutation(),
  };
};

export type GithubMutations = ReturnType<typeof useGithubMutations>;
export type ProjectMutations = ReturnType<typeof useProjectMutations>;
export type TechStackMutations = ReturnType<typeof useTechStackMutations>;
