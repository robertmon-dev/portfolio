import { z } from "zod";
import { zString, zUuid, zSafeArray } from "./generic";

export const RoleEnum = z.enum(["USER", "ADMIN", "MODERATOR", "VIEWER"]);
export const FlagEnum = z.enum(["READ", "WRITE", "ADMIN"]);

export const EndpointSchema = z.object({
  name: zString,
  flags: zSafeArray(FlagEnum),
});

export const UserPermissionSchema = z.object({
  resource: zString,
  flags: zSafeArray(FlagEnum),
});

export const UpdateUserPermissionsInputSchema = z.object({
  id: zUuid,
  permissions: zSafeArray(UserPermissionSchema),
});

export const AVAILABLE_RESOURCES = [
  "user",
  "github",
  "project",
  "techStack",
  "experience",
] as const;

export const ResourceEnum = z.enum(AVAILABLE_RESOURCES);
