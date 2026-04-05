import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";

export const isVideo = (url: string) => /\.(mp4|webm|ogg)$/i.test(url);

export type GeneralIcon =
  | LucideIcon
  | IconType
  | React.ComponentType<{
      size?: number | string;
      color?: string;
      className?: string;
    }>;

export interface TechMatcher {
  keywords: string[];
  Icon: GeneralIcon;
}

export interface SocialMatcher {
  keywords: string[];
  Icon: GeneralIcon;
}
