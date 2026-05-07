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
import type { Persisting } from "../core/database/types";
import { randomUUID } from "node:crypto";
import { Context } from "../trpc/context/types";
import { Permission } from "../trpc/permission/permission";
import { Flag, FlagEnum, RoleEnum } from "@portfolio/shared";
import { Role, PermissionFlag } from "@prisma/client";
import { Settings } from "src/core/settings/settings";
import type { Request, Response } from "express";

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
    $queryRaw: vi.fn(),
    $connect: vi.fn(),
    $disconnect: vi.fn(),
    $on: vi.fn(),
    $transaction: vi.fn(),
  } as unknown as MockedPrismaClient;
};

export const createCacheMock = (throws = false): Caching => ({
  set: vi.fn().mockResolvedValue(undefined),
  get: throws ? vi.fn() : vi.fn().mockResolvedValue(null),
  del: vi.fn().mockResolvedValue(undefined),
  wrap: vi.fn((_key, _ttl, fetcher) => fetcher()),
});

export const createLoggerMock = (): Logging => ({
  info: vi.fn(),
  warn: vi.fn(),
  debug: vi.fn(),
  error: vi.fn(),
});

export const mockTransaction = (prisma: MockedPrismaClient) => {
  prisma.$transaction.mockImplementation(
    (callback: (tx: unknown) => Promise<unknown>) => callback(prisma),
  );
};

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

export const baseServiceUtilities = (cacheThrows = false): ServiceMock => {
  return {
    prisma: createPrismaMock(),
    cache: createCacheMock(cacheThrows),
    logger: createLoggerMock(),
    settings: createSettingsMock(),
    clearAll: () => vi.clearAllMocks(),
  };
};

export const createStubPermission = (canReturn = true): Permission => {
  return {
    getUserId: () => "mock-id",
    getRole: () => Role.USER,
    can: () => canReturn,
    toEndpoints: () => [],
    getPermissionMap: () => new Map() as Map<string, Set<Flag>>,
  } as unknown as Permission;
};

export const createPermissionMock = (
  overrides: Partial<{
    userId: string | null;
    role: Role;
    permissions: { resource: string; flags: PermissionFlag[] }[];
  }> = {},
): Permission => {
  const defaultUserId = "user-123";
  const defaultRole = RoleEnum.enum.USER;

  const defaultPermissions =
    overrides.role === Role.ADMIN
      ? [{ resource: "all", flags: [FlagEnum.enum.ADMIN as PermissionFlag] }]
      : [];

  return new Permission(
    overrides.userId !== undefined ? overrides.userId : defaultUserId,
    overrides.role ?? defaultRole,
    overrides.permissions ?? defaultPermissions,
  );
};

export const createRequestMock = (
  overrides: Partial<Request> = {},
): Request => {
  return {
    headers: { authorization: "Bearer mock-token" },
    ip: "127.0.0.1",
    socket: { remoteAddress: "127.0.0.1" },
    method: "GET",
    url: "/",
    body: {},
    params: {},
    query: {},
    cookies: {},
    get: vi.fn((header: string) => {
      const headers: Record<string, string> = {
        authorization: "Bearer mock-token",
        ...((overrides.headers as Record<string, string>) ?? {}),
      };
      return headers[header.toLowerCase()] ?? null;
    }),
    ...overrides,
  } as unknown as Request;
};

export const createResponseMock = (
  overrides: Partial<Response> = {},
): Response => {
  const res = {
    statusCode: 200,
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
    send: vi.fn().mockReturnThis(),
    setHeader: vi.fn().mockReturnThis(),
    removeHeader: vi.fn().mockReturnThis(),
    writeHead: vi.fn().mockReturnThis(),
    end: vi.fn().mockReturnThis(),
    locals: {},
    ...overrides,
  } as unknown as Response;

  return res;
};

export const createMockCtx = (
  logger: Logging,
  cache: Caching,
  prisma: Persisting["client"],
  overrides: Partial<{
    permissions: Permission | null;
    ip: string;
    req: Partial<Request>;
    res: Partial<Response>;
    settings: Settings["config"];
  }> = {},
): Context => {
  return {
    db: prisma,
    cache: cache,
    logger: logger,
    ip: overrides.ip ?? "127.0.0.1",
    permissions:
      overrides.permissions !== undefined ? overrides.permissions : null,
    settings: overrides.settings ?? createSettingsMock(),
    req: createRequestMock(overrides.req),
    res: createResponseMock(overrides.res),
  };
};

export function setupServiceTest<T>(
  Constructor: BaseServiceConstructor<T>,
  cacheThrows = false,
) {
  const mocks = baseServiceUtilities(cacheThrows);
  const ctx = createMockCtx(mocks.logger, mocks.cache, mocks.prisma);

  const service = new Constructor(
    mocks.prisma,
    mocks.cache,
    mocks.logger,
    mocks.settings,
    ctx,
  );

  return { mocks, service };
}

export function useServiceTest<T>(
  Constructor: BaseServiceConstructor<T>,
  cacheTrows = false,
) {
  const context: ServiceTestContext<T> = {
    mocks: null as unknown as ServiceMock,
    service: null as unknown as T,
  };

  beforeEach(() => {
    const { mocks, service } = setupServiceTest(Constructor, cacheTrows);

    context.mocks = mocks;
    context.service = service;

    context.mocks.clearAll();
  });

  return context;
}
