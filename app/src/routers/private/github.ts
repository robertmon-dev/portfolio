import { z } from "zod";
import {
  UpdateGithubRepoInputSchema,
  LinkRepoProjectInputSchema,
  GithubRepoSchema,
  zUuid,
} from "@portfolio/shared";
import { router } from "../../trpc/init";
import { permissionProcedure } from "../../trpc/procedures/permission";
import { DeleteGithubRepoService } from "../../services/github/Delete";
import { LinkRepoProjectService } from "../../services/github/Link";
import { UpdateGithubRepoService } from "../../services/github/Update";
import { executeService } from "../../trpc/executers/base";
import { UnlinkRepoProjectService } from "../../services/github/Unlink";
import { FlagEnum, ResourceEnum } from "@portfolio/shared";

export const githubPrivateRouter = router({
  update: permissionProcedure(ResourceEnum.enum.github, FlagEnum.enum.WRITE)
    .meta({
      openapi: {
        method: "PATCH",
        path: "/admin/github/repo",
        tags: ["GitHub"],
        summary: "Update GitHub repository data",
        description: "Updates local information about a GitHub repository.",
        protect: true,
      },
    })
    .input(UpdateGithubRepoInputSchema)
    .output(GithubRepoSchema)
    .mutation(async ({ ctx, input }) =>
      executeService(UpdateGithubRepoService, ctx, input),
    ),

  linkProject: permissionProcedure(
    ResourceEnum.enum.github,
    FlagEnum.enum.WRITE,
  )
    .meta({
      openapi: {
        method: "POST",
        path: "/admin/github/repo/link",
        tags: ["GitHub"],
        summary: "Link repo to project",
        description:
          "Connects a GitHub repository to a specific portfolio project.",
        protect: true,
      },
    })
    .input(LinkRepoProjectInputSchema)
    .output(z.object({ success: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      await executeService(LinkRepoProjectService, ctx, input);
      return { success: true };
    }),

  unlinkProject: permissionProcedure(
    ResourceEnum.enum.github,
    FlagEnum.enum.WRITE,
  )
    .meta({
      openapi: {
        method: "DELETE",
        path: "/admin/github/repo/link",
        tags: ["GitHub"],
        summary: "Unlink repo from project",
        description:
          "Removes the connection between a GitHub repository and its project.",
        protect: true,
      },
    })
    .input(z.object({ repoId: zUuid }))
    .output(z.object({ success: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      await executeService(UnlinkRepoProjectService, ctx, input.repoId);
      return { success: true };
    }),

  delete: permissionProcedure(ResourceEnum.enum.github, FlagEnum.enum.WRITE)
    .meta({
      openapi: {
        method: "DELETE",
        path: "/admin/github/repo",
        tags: ["GitHub"],
        summary: "Delete GitHub repo reference",
        description:
          "Removes a GitHub repository reference from the local database.",
        protect: true,
      },
    })
    .input(z.object({ id: zUuid }))
    .output(z.object({ success: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      await executeService(DeleteGithubRepoService, ctx, input.id);
      return { success: true };
    }),
});
