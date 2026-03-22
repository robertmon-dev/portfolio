import { Express } from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import {
  createOpenApiExpressMiddleware,
  generateOpenApiDocument,
} from "trpc-to-openapi";
import { apiReference } from "@scalar/express-api-reference";
import { TrpcContext } from "../trpc/context/context";
import { Logger } from "../core/logger/logger";
import { appRouter } from "../routers/app";
import { Settings } from "../core/settings/settings";
import { TRPCError } from "@trpc/server";
import { getOpenApiDefinitions } from "@portfolio/shared";

export class TrpcInitializer {
  private logger: Logger;
  private trpcContext: TrpcContext;
  private settings = Settings.getInstance().config;

  constructor() {
    this.logger = new Logger("TrpcInitializer");
    this.trpcContext = new TrpcContext();
  }

  public setup(app: Express): void {
    this.logger.info("Initializing tRPC & REST OpenAPI layer...");

    const createContext = (opts: trpcExpress.CreateExpressContextOptions) =>
      this.trpcContext.create(opts);

    app.use(
      "/trpc",
      trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
        onError: ({ path, error }) => {
          this.logger.error(`tRPC failed on '${path ?? "<no-path>"}'`, {
            message: error.message,
            code: error.code,
          });
        },
      }),
    );

    app.use(
      "/api",
      createOpenApiExpressMiddleware({
        router: appRouter,
        createContext,
        responseMeta: undefined,
        maxBodySize: undefined,
        onError: ({
          path,
          error,
        }: {
          path: string | undefined;
          error: TRPCError;
        }) => {
          this.logger.error(`OpenAPI/REST failed on '${path ?? "<no-path>"}'`, {
            message: error instanceof Error ? error.message : "Unknown error",
            code: error.code,
          });
        },
      }),
    );

    const openApiDocument = generateOpenApiDocument(appRouter, {
      title: "Portfolio API",
      description: "RESTful API generated from tRPC router",
      version: "1.0.0",
      baseUrl: `${this.settings.APP_URL}/api`,
      defs: { ...getOpenApiDefinitions() },
      docsUrl: "https://github.com/robertmon-dev/portfolio",
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    });

    app.use("/api-json", (_, res) => res.json(openApiDocument));
    app.use(
      "/api-docs",
      apiReference({
        theme: "bluePlanet",
        spec: {
          url: "/api-json",
        },
        layout: "modern",
      }),
    );

    this.logger.info("tRPC mounted at /trpc");
    this.logger.info("REST API mounted at /api");
    this.logger.info("Scalar UI (Modern Docs) available at /api-docs");
  }
}
