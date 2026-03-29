import { QueryClient, MutationCache, QueryCache } from "@tanstack/react-query";
import { TRPCClientError } from "@trpc/client";
import { notifyError } from "./handlers/trpcError";

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (err) => {
      notifyError(err);
    },
  }),

  queryCache: new QueryCache({
    onError: (err) => {
      if (err instanceof TRPCClientError && err.data?.code === "UNAUTHORIZED") {
        localStorage.removeItem("token");
      }

      notifyError(err);
    },
  }),
});
