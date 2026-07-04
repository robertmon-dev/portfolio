import {
  ThumbsUp,
  Heart,
  Laugh,
  Sparkles,
  Frown,
  Angry,
  type LucideIcon,
} from "lucide-react";
import type { ReactionKind } from "@portfolio/shared";

export const REACTION_ICONS: Record<ReactionKind, LucideIcon> = {
  LIKE: ThumbsUp,
  LOVE: Heart,
  HAHA: Laugh,
  WOW: Sparkles,
  SAD: Frown,
  ANGRY: Angry,
};

export const COMMENTS_PER_PAGE = 10;
