import { trpc } from "@/lib/trpc/client";

export const useProjectQueries = () => {
  return {
    list: trpc.projects.list.useQuery({ onlyVisible: true }),
  };
};
