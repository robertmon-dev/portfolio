import { Globe, Twitter } from "lucide-react";
import { ICON_MATCHERS } from "./consts";

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
