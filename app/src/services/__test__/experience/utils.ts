import { MOCK_UUID } from "../../../mocks/core";
import type { Experience } from "@prisma/client";
import { randomUUID } from "crypto";

export const createFakeExperience = (count: number): Experience[] => {
  return Array.from({ length: count }).map((_, idx) => ({
    id: randomUUID(),
    position: `pos-${idx}`,
    company: `comp-${idx}`,
    startDate: new Date(),
    endDate: new Date(),
    description: `description-${MOCK_UUID}`,
    notes: `notes-${MOCK_UUID}`,
    isCurrent: idx % 2 == 0,
    createdAt: new Date(),
  }));
};
