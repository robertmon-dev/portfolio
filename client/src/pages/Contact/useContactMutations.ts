import { trpc } from "@/lib/trpc/client";

export const useContactMutations = () => {
  return {
    submit: trpc.contact.submit.useMutation(),
  };
};

export type ContactMutations = ReturnType<typeof useContactMutations>;
