import type { HealtCheckReponse } from "@portfolio/shared";

export interface HealthChecking {
  execute(): Promise<HealtCheckReponse>;
}
