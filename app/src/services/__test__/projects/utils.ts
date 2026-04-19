import { MOCK_UUID } from "../../../mocks/core";

export const createFakeProjects = (count: number) => {
  const base = Array.from({ length: count }).map((_, idx) => ({
    id: MOCK_UUID,
    slug: `slug-${idx}`,
    title: `title-${idx}`,
    description: `description-${idx}`,
    content: `content-${idx}`,

    imageUrl: `https://web.com`,
    demoUrl: `https://demo.com`,

    isFeatured: idx % 2 === 0,
    isVisible: idx % 2 === 0,

    createdAt: new Date(),
    updatedAt: new Date(),

    techStack: [],
    gallery: [],

    githubRepoId: MOCK_UUID,
    githubRepo: { id: MOCK_UUID },
  }));

  return base;
};
