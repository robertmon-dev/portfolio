import { z } from "zod";

export const RoleEnum = z.enum(["USER", "ADMIN", "MODERATOR", "VIEWER"]);
export const FlagEnum = z.enum(["READ", "WRITE", "ADMIN"]);

export const EndpointSchema = z.object({
  name: z.string(),
  flags: z.array(FlagEnum),
});

export const UserPermissionSchema = z.object({
  resource: z.string(),
  flags: z.array(FlagEnum),
});

export const UpdateUserPermissionsInputSchema = z.object({
  id: z.uuid(),
  permissions: z.array(UserPermissionSchema),
});
