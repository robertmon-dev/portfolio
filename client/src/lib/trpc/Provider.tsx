import { useState } from "react";
import { httpBatchLink } from "@trpc/client";
import { QueryClientProvider } from "@tanstack/react-query";
import superjson from "superjson";
import { trpc } from "./client";
import { queryClient } from "./queryClient";

export const TRPCProvider = ({ children }: { children: React.ReactNode }) => {
  const API_URL = import.meta.env?.VITE_API_URL || "http://localhost:8800";

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${API_URL}/trpc`,
          transformer: superjson,
          headers() {
            const token = localStorage.getItem("token");
            return {
              Authorization: token ? `Bearer ${token}` : undefined,
            };
          },
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
