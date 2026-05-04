import type { CreateTagInput, Tag } from "@portfolio/shared";
import { BaseService } from "../service";
import { TRPCError } from "@trpc/server";
import { tagWithRelationsQuery } from "./queries";

export class CreateTagService extends BaseService {
  public async execute(input: CreateTagInput): Promise<Tag> {
    const { name, slug, categoryId, ...rest } = input;

    const created = await this.db.$transaction(async (tx) => {
      const persisted = await tx.tag.findUnique({
        where: { name, slug },
        select: { id: true },
      });

      if (persisted !== null) {
        throw new TRPCError({
          code: "CONFLICT",
          message: `Tag with such slug or name is already persisted`,
        });
      }

      if (categoryId !== null) {
        const category = await tx.tagCategory.findUnique({
          where: { id: categoryId },
          select: { id: true },
        });

        if (category === null) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Not found category with provided ID",
          });
        }
      }

      return await tx.tag.create({
        data: {
          name,
          slug,
          ...rest,
          category:
            categoryId !== null ? { connect: { id: categoryId } } : undefined,
        },
        ...tagWithRelationsQuery,
      });
    });

    return created;
  }
}
