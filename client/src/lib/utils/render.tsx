import { Globe, Twitter, Code2 } from "lucide-react";
import { ICON_MATCHERS, TECH_ICON_MATCHERS } from "./consts";
import type { GeneralIcon } from "./types";

export const getPlatformIcon = (platform: string, url: string): GeneralIcon => {
  const p = platform.toLowerCase();
  const u = url.toLowerCase();

  if (p === "x") return Twitter;

  const match = ICON_MATCHERS.find(({ keywords }) =>
    keywords.some((kw) => p.includes(kw) || u.includes(kw)),
  );

  return match ? match.Icon : Globe;
};

export const getTechIcon = (techName: string): GeneralIcon => {
  const name = techName.toLowerCase();

  const match = TECH_ICON_MATCHERS.find(({ keywords }) =>
    keywords.some((kw) => name.includes(kw)),
  );

  return match ? match.Icon : Code2;
};
