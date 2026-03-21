import type { User } from "@prisma/client";
import type {
  CreateUserInput,
  UpdateUserInput,
  ListUsersInput,
  GetUserInput,
  DeleteUserInput,
  UserProfile,
} from "@portfolio/shared";

export type UserListItem = Pick<
  User,
  | "id"
  | "email"
  | "username"
  | "role"
  | "createdAt"
  | "twoFactorEnabled"
  | "avatarUrl"
  | "name"
>;

export type UserWithCounts = User & {
  _count: {
    VerificationCode: number;
  };
};

export interface UserListing {
  execute(input: ListUsersInput): Promise<UserListItem[]>;
}

export interface UserRetrieving {
  execute(input: GetUserInput): Promise<UserProfile>;
}

export interface UserCreating {
  execute(input: CreateUserInput): Promise<UserProfile>;
}

export interface UserUpdating {
  execute(input: UpdateUserInput): Promise<UserProfile>;
}

export interface UserDeleting {
  execute(input: DeleteUserInput): Promise<void>;
}
