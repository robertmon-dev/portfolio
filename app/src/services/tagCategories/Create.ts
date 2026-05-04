import { CreateTagCategoryInput, TagCategory } from "@portfolio/shared";
import { BaseService } from "../service";
import { TRPCError } from "@trpc/server";
import { tagCategoryWithRelationsQuery } from "./queries";

export class CreateTagCategoryService extends BaseService {
  public async execute(input: CreateTagCategoryInput): Promise<TagCategory> {
    const created = this.db.$transaction(async (tx) => {
      const persisted = await tx.tagCategory.findUnique({
        where: { name: input.name },
      });

      if (persisted !== null) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Tag category with chosen name is already persisted",
        });
      }

      const created = await tx.tagCategory.create({
        data: {
          name: input.name,
          parent:
            input.parentId !== null
              ? { connect: { id: input.parentId } }
              : undefined,
        },
        ...tagCategoryWithRelationsQuery,
      });

      return created;
    });

    return created;
  }
}
