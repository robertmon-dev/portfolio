import { z } from "zod";

export const RoleEnum = z.enum(["USER", "ADMIN", "MODERATOR", "VIEWER"]);
export const FlagEnum = z.enum(["read", "write", "admin"]);

export const EndpointSchema = z.object({
  name: z.string(),
  flags: z.array(FlagEnum),
});

export const UserPermissionSchema = z.object({
  resource: z.string(),
  flags: z.array(z.enum(["READ", "WRITE", "ADMIN"])),
});

export const UpdateUserPermissionsInputSchema = z.object({
  id: z.string().uuid(),
  permissions: z.array(UserPermissionSchema),
});
