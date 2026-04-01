import { QueryClient, MutationCache, QueryCache } from "@tanstack/react-query";
import { notifyError } from "./handlers/trpcError";
import { isSilentTRPCPath } from "@portfolio/shared";

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (err) => {
      notifyError(err);
    },
  }),

  queryCache: new QueryCache({
    onError: (err, query) => {
      if (query.meta?.silent) {
        return;
      }

      if (isSilentTRPCPath(query.queryKey[0])) {
        return;
      }

      notifyError(err);
    },
  }),
});
