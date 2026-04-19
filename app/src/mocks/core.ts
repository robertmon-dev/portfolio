import { vi, beforeEach } from "vitest";
import type {
  MockedPrismaClient,
  ServiceMock,
  ServiceTestContext,
} from "./types";
import type { Caching } from "../infrastructure/cache/types";
import type { Logging } from "../core/logger/types";
import type { EnvConfig } from "../core/settings/types";
import type { BaseServiceConstructor } from "../trpc/executers/types";
import { randomUUID } from "node:crypto";

export const MOCK_UUID = randomUUID();

export const createPrismaMock = (): MockedPrismaClient => {
  return {
    githubCommit: {
      deleteMany: vi.fn(),
      findUnique: vi.fn(),
      findFirst: vi.fn(),
      findMany: vi.fn(),
      delete: vi.fn(),
      update: vi.fn(),
    },
    githubRepo: {
      findFirst: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      deleteMany: vi.fn(),
      upsert: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    githubStats: {
      upsert: vi.fn(),
      findUnique: vi.fn(),
    },
    experience: {
      create: vi.fn(),
      deleteMany: vi.fn(),
      findFirst: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    project: {
      findMany: vi.fn(),
      findUniqueOrThrow: vi.fn(),
    },
    $connect: vi.fn(),
    $disconnect: vi.fn(),
    $on: vi.fn(),
    $transaction: vi.fn(),
  } as unknown as MockedPrismaClient;
};

export const createCacheMock = (): Caching => ({
  set: vi.fn().mockResolvedValue(undefined),
  get: vi.fn().mockResolvedValue(null),
  del: vi.fn().mockResolvedValue(undefined),
  wrap: vi.fn((_key, _ttl, fetcher) => fetcher()),
});

export const createLoggerMock = (): Logging => ({
  info: vi.fn(),
  warn: vi.fn(),
  debug: vi.fn(),
  error: vi.fn(),
});

export const createSettingsMock = (
  overrides: Partial<EnvConfig> = {},
): EnvConfig => {
  const config: EnvConfig = {
    NODE_ENV: "test",
    PORT: 8800,
    DATABASE_URL: "postgresql://localhost:5432/db",
    DB_TLS_ENABLED: false,
    DB_CA_PATH: null,
    REDIS_URL: "redis://localhost:6379",
    REDIS_TLS_ENABLED: false,
    REDIS_CA_PATH: null,
    JWT_SECRET: "a-very-long-and-secure-jwt-secret-key-32-chars",
    NICKNAME: "Robert",
    ROOT_EMAIL: "root@example.com",
    ROOT_PASSWORD: "admin1234",
    ROOT_USERNAME: "root",
    LOG_LEVEL: "info",
    APP_URL: "http://localhost:8800",
    GITHUB_TOKEN: "mock-token",
    MAIL_HOST: "localhost",
    MAIL_PORT: 587,
    MAIL_USER: "user",
    MAIL_PASS: "pass",
    MAIL_FROM: "no-reply@example.com",
    X_API_TOKEN: MOCK_UUID,
    CORS_ORIGIN: "http://localhost:8800",
    ...overrides,
  };

  return config;
};

export const baseServiceUtilities = (): ServiceMock => {
  return {
    prisma: createPrismaMock(),
    cache: createCacheMock(),
    logger: createLoggerMock(),
    settings: createSettingsMock(),
    clearAll: () => vi.clearAllMocks(),
  };
};

export function setupServiceTest<T>(Constructor: BaseServiceConstructor<T>) {
  const mocks = baseServiceUtilities();

  const service = new Constructor(
    mocks.prisma,
    mocks.cache,
    mocks.logger,
    mocks.settings,
  );

  return { mocks, service };
}

export function useServiceTest<T>(Constructor: BaseServiceConstructor<T>) {
  const context: ServiceTestContext<T> = {
    mocks: null as unknown as ServiceMock,
    service: null as unknown as T,
  };

  beforeEach(() => {
    const { mocks, service } = setupServiceTest(Constructor);

    context.mocks = mocks;
    context.service = service;

    context.mocks.clearAll();
  });

  return context;
}
