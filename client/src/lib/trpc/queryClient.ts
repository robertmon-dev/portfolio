import { QueryClient, MutationCache, QueryCache } from '@tanstack/react-query';
import { TRPCClientError } from '@trpc/client';
import { handleTrpcError } from './handlers/trpcError';
import { toast } from 'react-toastify';

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error) => {
      const message = handleTrpcError(error);
      if (message) {
        toast.error(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
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
