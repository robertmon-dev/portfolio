import { trpc } from "@/lib/trpc/client";
import { STALE_TIME } from "@/lib/consts/cache";

export const usePostQueries = (id: string) => {
  const recordView = trpc.posts.view.useMutation();

  return {
    get: trpc.posts.getById.useQuery(
      { id },
      {
        staleTime: STALE_TIME,
        enabled: !!id,
        retry: false,
      },
    ),
    recordView,
  };
};
