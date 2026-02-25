import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@portfolio/app';

export const trpc = createTRPCReact<AppRouter>();
export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: 'http://localhost:8800/trpc',
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: 'include',
        });
      },
    }),
  ],
});
