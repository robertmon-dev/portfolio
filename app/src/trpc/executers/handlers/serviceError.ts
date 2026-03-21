import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import type { Logging } from "../../../core/logger/types";

export const handleServiceError = (error: unknown, logger: Logging): never => {
  if (error instanceof TRPCError) {
    throw error;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2025":
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Record not found for deletion or update.",
          cause: error,
        });
      case "P2002":
        throw new TRPCError({
          code: "CONFLICT",
          message: "Record already exists. Values must be unique.",
          cause: error,
        });
      case "P2003":
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message:
            "Operation failed due to related records. Check foreign key constraints.",
          cause: error,
        });
      case "P2014":
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Invalid relation. The change violates a required relation between models.",
          cause: error,
        });
      default:
        logger.error(`Unhandled Prisma request error [${error.code}]:`, error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "A database error occurred.",
          cause: error,
        });
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    logger.warn("Prisma validation error (malformed query):", error);
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Database operation failed due to invalid data format.",
      cause: error,
    });
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    logger.error("Database connection initialization failed:", error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Unable to connect to the database.",
      cause: error,
    });
  }

  logger.error("Unexpected service error:", error);
  throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: "An unexpected server error occurred.",
    cause: error,
  });
};
