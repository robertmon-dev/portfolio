import { z } from "zod";
import * as u from "../schemas/user";

export type UserProfile = z.infer<typeof u.UserProfileSchema>;
export type MeResponse = z.infer<typeof u.MeResponseSchema>;

export type GetUserInput = z.infer<typeof u.GetUserInputSchema>;
export type ListUsersInput = z.infer<typeof u.ListUsersInputSchema>;
export type UpdateUserInput = z.infer<typeof u.UpdateUserInputSchema>;
export type DeleteUserInput = z.infer<typeof u.DeleteUserInputSchema>;
export type CreateUserInput = z.infer<typeof u.CreateUserInputSchema>;
