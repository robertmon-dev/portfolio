import type {
  UserPublic,
  Experience,
  TechStack,
  GithubCommit,
} from "@portfolio/shared";

export interface AboutHeroProps {
  profile?: UserPublic | null;
}

export interface ExperienceTimelineProps {
  items: Experience[];
}

export interface TechStackGridProps {
  items: TechStack[];
  isLoading?: boolean;
}

export interface LatestCommitsProps {
  items: GithubCommit[];
  isLoading?: boolean;
}
