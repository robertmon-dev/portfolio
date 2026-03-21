import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@portfolio/app";

export const trpc = createTRPCReact<AppRouter>();
