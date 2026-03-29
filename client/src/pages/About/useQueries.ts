import { trpc } from "../../lib/trpc/client";

export const useExperienceQueries = () => {
  return {
    list: trpc.experience.list.useQuery(undefined, {
      staleTime: 1000 * 60 * 60,
    }),
  };
};

export const useTechStackQueries = () => {
  return {
    list: trpc.techStack.list.useQuery(undefined, {
      staleTime: 1000 * 60 * 60,
    }),
  };
};

export const useProjectQueries = (onlyFeatured = true) => {
  return {
    list: trpc.projects.list.useQuery({ onlyFeatured, onlyVisible: true }),
  };
};
