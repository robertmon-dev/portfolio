import type { Tag, UpdateTagInput } from "@portfolio/shared";
import { BaseService } from "../service";
import { TRPCError } from "@trpc/server";
import { tagWithRelationsQuery } from "./queries";

export class UpdateTagService extends BaseService<UpdateTagInput, Tag> {
  public async execute(input: UpdateTagInput): Promise<Tag> {
    const updated = await this.db.$transaction(async (tx) => {
      const { id: tagId, ...rest } = input;

      const persisted = await tx.tag.findUnique({
        where: { id: input.id },
        select: { id: true },
      });

      if (persisted === null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Tag ",
        });
      }

      return await tx.tag.update({
        where: { id: tagId },
        data: { ...rest },
        ...tagWithRelationsQuery,
      });
    });

    await Promise.all([
      this.invalidateTagsCache(updated),
      this.invalidatePostCache(...updated.posts),
    ]);

    return updated;
  }
}
