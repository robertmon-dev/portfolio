import { useState } from "react";
import { useTranslation } from "react-i18next";
import { type UpdateUserPermissionsInput } from "@portfolio/shared";
import type { UpdatePermissionsFormProps } from "../../types";

export const useUpdatePermissionsForm = ({
  initialData,
  onSubmit,
  isLoading,
}: Omit<UpdatePermissionsFormProps, "onCancel">) => {
  const { t } = useTranslation();

  const availableResources = [
    "users",
    "projects",
    "posts",
    "settings",
    "techstack",
  ];

  const [permissions, setPermissions] = useState<
    UpdateUserPermissionsInput["permissions"]
  >(() => {
    if (!initialData.permissions) return [];
    return [...initialData.permissions];
  });

  const isProcessing = isLoading;

  const handlers = {
    toggleFlag: (resource: string, flag: "READ" | "WRITE" | "ADMIN") => {
      setPermissions((prev) => {
        const existingPermIndex = prev.findIndex(
          (p) => p.resource === resource,
        );

        if (existingPermIndex === -1) {
          return [...prev, { resource, flags: [flag] }];
        }

        const existingPerm = prev[existingPermIndex];
        const hasFlag = existingPerm.flags.includes(flag);

        let newFlags;
        if (hasFlag) {
          newFlags = existingPerm.flags.filter((f) => f !== flag);
        } else {
          newFlags = [...existingPerm.flags, flag];
        }

        if (newFlags.length === 0) {
          return prev.filter((_, i) => i !== existingPermIndex);
        }

        const newList = [...prev];
        newList[existingPermIndex] = {
          ...existingPerm,
          flags: newFlags,
        };
        return newList;
      });
    },

    toggleAllForResource: (resource: string, allSelected: boolean) => {
      setPermissions((prev) => {
        if (allSelected) {
          return prev.filter((p) => p.resource !== resource);
        } else {
          const filtered = prev.filter((p) => p.resource !== resource);
          return [...filtered, { resource, flags: ["READ", "WRITE", "ADMIN"] }];
        }
      });
    },
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: initialData.id,
      permissions,
    });
  };

  const getFlagsForResource = (resource: string) => {
    const perm = permissions.find((p) => p.resource === resource);
    return perm ? perm.flags : [];
  };

  return {
    t,
    availableResources,
    permissions,
    isProcessing,
    handlers,
    submitForm,
    getFlagsForResource,
  };
};
