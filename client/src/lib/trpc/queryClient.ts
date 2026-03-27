import { QueryClient, MutationCache, QueryCache } from '@tanstack/react-query';
import { TRPCClientError } from '@trpc/client';
import { notifyError } from './handlers/trpcError';
import { toast } from 'react-toastify';

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (err) => {
      notifyError(err);
    },
  }),

  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof TRPCClientError && error.data?.code === 'UNAUTHORIZED') {
        localStorage.removeItem('token');
      }
    }
  })
});
