import type { LucideIcon } from "lucide-react";

export const isVideo = (url: string) => /\.(mp4|webm|ogg)$/i.test(url);

export interface TechMatcher {
  keywords: string[];
  Icon: LucideIcon;
  color?: string;
}

export interface SocialMatcher {
  keywords: string[];
  Icon: LucideIcon;
}
