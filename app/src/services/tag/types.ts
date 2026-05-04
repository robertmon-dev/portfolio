import { Prisma } from "@prisma/client";
import { tagWithRelationsQuery } from "./queries";

export type TagWithRelations = Prisma.TagGetPayload<
  typeof tagWithRelationsQuery
>;
