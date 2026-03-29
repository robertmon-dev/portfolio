import { Prisma } from "@prisma/client";

export const userWithPermissionsFragment =
  Prisma.validator<Prisma.UserDefaultArgs>()({
    include: {
      permissions: {
        select: {
          resource: true,
          flags: true,
        },
      },
    },
  });

export type UserWithPermissions = Prisma.UserGetPayload<
  typeof userWithPermissionsFragment
>;

export const userProfileQuery = {
  select: {
    id: true,
    email: true,
    username: true,
    role: true,
    createdAt: true,
    updatedAt: true,
    twoFactorEnabled: true,
    avatarUrl: true,
    name: true,
    headline: true,
    bio: true,
    socials: true,
    permissions: {
      select: {
        resource: true,
        flags: true,
      },
    },
  },
} satisfies Prisma.UserDefaultArgs;

export type UserWithProfile = Prisma.UserGetPayload<typeof userProfileQuery>;

export const userPublicQuery = {
  select: {
    id: true,
    username: true,
    name: true,
    headline: true,
    bio: true,
    avatarUrl: true,
    socials: true,
  },
} satisfies Prisma.UserDefaultArgs;

export type UserPublic = Prisma.UserGetPayload<typeof userPublicQuery>;
