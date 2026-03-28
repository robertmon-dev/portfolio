import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { UpdateUserPermissionsInputSchema } from "@portfolio/shared";
import type {
  UpdateUserPermissionsInput,
  Flag,
  UserPermission,
} from "@portfolio/shared";
import type { UpdatePermissionsFormProps } from "../../types";

export const useUpdatePermissionsForm = ({
  initialData,
  onSubmit,
}: Omit<UpdatePermissionsFormProps, "onCancel">) => {
  const { t } = useTranslation();

  const availableResources = [
    "user",
    "github",
    "project",
    "techStack",
    "experience",
  ];

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm<UpdateUserPermissionsInput>({
    resolver: zodResolver(UpdateUserPermissionsInputSchema),
    defaultValues: {
      id: initialData.id,
      permissions: initialData.permissions ?? [],
    },
  });

  const watchedPermissions = watch("permissions");

  const getFlagsForResource = (resource: string): Flag[] => {
    const perm = watchedPermissions.find((p) => p.resource === resource);
    return perm ? (perm.flags as Flag[]) : [];
  };

  const handlers = {
    toggleFlag: (resource: string, flag: Flag) => {
      const currentPerms: UserPermission[] = [...watchedPermissions];
      const index = currentPerms.findIndex((p) => p.resource === resource);

      if (index === -1) {
        currentPerms.push({ resource, flags: [flag] });
      } else {
        const existingPerm = currentPerms[index];
        const existingFlags = existingPerm.flags;
        const hasFlag = existingFlags.includes(flag);

        const newFlags = hasFlag
          ? existingFlags.filter((f) => f !== flag)
          : [...existingFlags, flag];

        if (newFlags.length === 0) {
          currentPerms.splice(index, 1);
        } else {
          currentPerms[index] = { ...existingPerm, flags: newFlags as Flag[] };
        }
      }

      setValue("permissions", currentPerms, { shouldDirty: true });
    },

    toggleAllForResource: (resource: string, allSelected: boolean) => {
      const currentPerms = watchedPermissions.filter(
        (p) => p.resource !== resource,
      );

      if (!allSelected) {
        currentPerms.push({
          resource,
          flags: ["READ", "WRITE", "ADMIN"] as Flag[],
        });
      }

      setValue("permissions", currentPerms, { shouldDirty: true });
    },
  };

  return {
    t,
    availableResources,
    isProcessing: isSubmitting,
    handlers,
    handleSubmit: handleSubmit((data) => onSubmit(data)), // ✅ Zmieniamy nazwę na handleSubmit
    getFlagsForResource,
  };
};
