import { z } from "zod";
import { HealthResponseSchema } from "./diagnostics";
import * as AuthSchemas from "./auth";
import * as ExperienceSchemas from "./experience";
import * as GithubSchemas from "./github";
import * as PermissionsSchemas from "./permission";
import * as ProjectSchemas from "./project";
import * as TechStackSchemas from "./techStack";
import * as UserSchemas from "./user";

export const getOpenApiDefinitions = () => {
  return {
    HealthResponse: HealthResponseSchema,
  };
};
