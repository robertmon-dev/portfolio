import { z } from "zod";
import * as p from "../schemas/permission";

export type Role = z.infer<typeof p.RoleEnum>;
export type Flag = z.infer<typeof p.FlagEnum>;
export type Endpoint = z.infer<typeof p.EndpointSchema>;
export type UserPermission = z.infer<typeof p.UserPermissionSchema>;
