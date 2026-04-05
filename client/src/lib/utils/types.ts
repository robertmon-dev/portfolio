import type { LucideIcon } from "lucide-react";

export const isVideo = (url: string) => /\.(mp4|webm|ogg)$/i.test(url);

type IconComponent = React.ComponentType<{
  size?: number | string;
  color?: string;
}>;

export interface TechMatcher {
  keywords: string[];
  Icon: IconComponent;
}

export interface SocialMatcher {
  keywords: string[];
  Icon: LucideIcon;
}
