import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@portfolio/app/contract";

export const trpc = createTRPCReact<AppRouter>();
