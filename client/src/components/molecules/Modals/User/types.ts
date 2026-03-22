import {
  UserProfile,
  CreateUserInput,
  UpdateUserInput,
  UpdateUserPermissionsInput,
} from "@portfolio/shared";
import type { UserActions } from "@/pages/Admin/users/types";

export interface UserFormProps {
  initialData?: UserProfile;
  onSubmit: (data: CreateUserInput | UpdateUserInput) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export interface UserModalProps {
  state: UserActions["state"];
  actions: UserActions["actions"];
}

export interface CreateUserFormProps {
  onSubmit: (data: CreateUserInput) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export interface UpdateUserFormProps {
  initialData: UserProfile;
  onSubmit: (data: UpdateUserInput) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export interface UpdatePermissionsFormProps {
  initialData: UserProfile;
  onSubmit: (data: UpdateUserPermissionsInput) => void;
  onCancel: () => void;
  isLoading?: boolean;
}
