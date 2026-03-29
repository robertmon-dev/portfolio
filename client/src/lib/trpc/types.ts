import { trpc } from "./client";

export interface ErrorResult {
  message: string | null;
  isCritical: boolean;
}

export type Utils = ReturnType<typeof trpc.useUtils>;
