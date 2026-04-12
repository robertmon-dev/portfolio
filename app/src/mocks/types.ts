import { type Mock } from "vitest";
import type { PrismaClient } from "@prisma/client";
import type { EnvConfig } from "../core/settings/types";
import type { Logging } from "../core/logger/types";
import type { Caching } from "../infrastructure/cache/types";

export interface MockPrisma {
  githubCommit: {
    findUnique: Mock;
    findMany: Mock;
    delete: Mock;
    update: Mock;
  };
  $connect: Mock;
  $disconnect: Mock;
  $on: Mock;
  $transaction: Mock;
}

export type MockedPrismaClient = PrismaClient & MockPrisma;

export interface ServiceMock {
  prisma: MockedPrismaClient;
  settings: EnvConfig;
  logger: Logging;
  cache: Caching;
  clearAll: () => void;
}
