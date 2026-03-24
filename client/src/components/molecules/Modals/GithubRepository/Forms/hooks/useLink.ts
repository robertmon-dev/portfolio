import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LinkRepoProjectInputSchema,
  type GithubRepo,
  type LinkRepoProjectInput,
} from "@portfolio/shared";

export const useGithubLinkRepoForm = ({
  repo,
  onSubmit,
}: {
  repo: GithubRepo;
  onSubmit: (data: LinkRepoProjectInput) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LinkRepoProjectInput>({
    resolver: zodResolver(LinkRepoProjectInputSchema),
    defaultValues: {
      repoId: repo.id,
      projectId: repo.project?.id ?? "",
    },
  });

  return {
    register,
    errors,
    handleSubmit: handleSubmit((data) => onSubmit(data)),
  };
};
