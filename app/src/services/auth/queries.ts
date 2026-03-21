import { Prisma } from "@prisma/client";
import { userProfileQuery } from "../user/queries";

export const userAuthQuery = {
  select: {
    ...userProfileQuery.select,
    passwordDigest: true,
  },
} satisfies Prisma.UserDefaultArgs;

export type UserWithAuth = Prisma.UserGetPayload<typeof userAuthQuery>;
