import { trpc } from "@/lib/trpc/client";
import { STALE_TIME } from "@/lib/consts/cache";

export const useGithubCommitQueries = (limit: number = 3) => {
  return {
    list: trpc.githubCommit.list.useQuery(
      { limit },
      {
        staleTime: STALE_TIME,
      },
    ),
    infinite: trpc.githubCommit.list.useInfiniteQuery(
      { limit },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        staleTime: STALE_TIME,
      },
    ),
  };
};

export const useExperienceQueries = () => {
  return {
    list: trpc.experience.list.useQuery(undefined, {
      staleTime: STALE_TIME,
    }),
  };
};

export const useTechStackQueries = () => {
  return {
    list: trpc.techStack.list.useQuery(undefined, {
      staleTime: STALE_TIME,
    }),
  };
};

export const useProjectQueries = (onlyFeatured = true) => {
  return {
    list: trpc.projects.list.useQuery({ onlyFeatured, onlyVisible: true }),
  };
};

export const useProfileQueries = () => {
  return {
    get: trpc.users.get.useQuery(undefined, {
      staleTime: STALE_TIME,
    }),
  };
};
