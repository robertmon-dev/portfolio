import { Globe, Twitter, Code2 } from "lucide-react";
import { ICON_MATCHERS, TECH_ICON_MATCHERS } from "./consts";

export const getPlatformIcon = (platform: string, url: string) => {
  const p = platform.toLowerCase();
  const u = url.toLowerCase();

  if (p === "x") return <Twitter size={18} />;

  const match = ICON_MATCHERS.find(({ keywords }) =>
    keywords.some((kw) => p.includes(kw) || u.includes(kw)),
  );

  const IconComponent = match ? match.Icon : Globe;

  return <IconComponent size={18} />;
};

export const getTechIcon = (techName: string) => {
  const name = techName.toLowerCase();

  const match = TECH_ICON_MATCHERS.find(({ keywords }) =>
    keywords.some((kw) => name.includes(kw)),
  );

  const IconComponent = match ? match.Icon : Code2;

  return <IconComponent size={18} />;
};
