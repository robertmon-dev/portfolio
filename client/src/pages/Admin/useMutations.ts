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
    unlinkProject: trpc.admin.techStack.unlinkProject.useMutation(),
  };
};

export const useUserMutations = () => {
  return {
    create: trpc.admin.users.create.useMutation(),
    update: trpc.admin.users.update.useMutation(),
    delete: trpc.admin.users.delete.useMutation(),
    updatePermissions: trpc.admin.users.updatePermissions.useMutation(),
  };
};

export const useExperienceMutations = () => {
  return {
    create: trpc.admin.experience.create.useMutation(),
    update: trpc.admin.experience.update.useMutation(),
    delete: trpc.admin.experience.delete.useMutation(),
  };
};

export type GithubMutations = ReturnType<typeof useGithubMutations>;
export type ProjectMutations = ReturnType<typeof useProjectMutations>;
export type TechStackMutations = ReturnType<typeof useTechStackMutations>;
export type UserMutations = ReturnType<typeof useUserMutations>;
export type ExperienceMutations = ReturnType<typeof useExperienceMutations>;
