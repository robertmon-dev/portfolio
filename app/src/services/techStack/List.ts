import { z } from "zod";
import { BaseService } from "../service";
import {
  TechStackWithRelationsSchema,
  type TechStackWithRelations,
} from "@portfolio/shared";
import type { TechStackListing } from "./types";
import { techStackWithRelationsQuery } from "./queries";

export class ListTechStacksService
  extends BaseService
  implements TechStackListing
{
  public async execute(): Promise<TechStackWithRelations[]> {
    const cacheKey = `techstack:list:all`;

    return this.cache.wrap(cacheKey, 3600, async () => {
      this.logger.debug("Fetching tech stack from database (cache miss)");

      const items = await this.db.techStack.findMany({
        orderBy: [{ category: "asc" }, { name: "asc" }],
        ...techStackWithRelationsQuery,
      });

      return z.array(TechStackWithRelationsSchema).parse(items);
    });
  }
}
