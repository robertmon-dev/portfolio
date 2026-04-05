import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiGo,
  SiRust,
  SiOpenjdk,
  SiKotlin,
  SiCplusplus,
  SiReact,
  SiNodedotjs,
  SiDocker,
  SiPostgresql,
  SiTailwindcss,
  SiPrisma,
} from "react-icons/si";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import { Layout, Terminal, Cpu } from "lucide-react";
import type { SocialMatcher, TechMatcher } from "./types";

export const ICON_MATCHERS: SocialMatcher[] = [
  { keywords: ["mail", "mailto:"], Icon: Mail },
  { keywords: ["github"], Icon: Github },
  { keywords: ["linkedin"], Icon: Linkedin },
  { keywords: ["twitter", "x.com"], Icon: Twitter },
  { keywords: ["facebook"], Icon: Facebook },
  { keywords: ["instagram"], Icon: Instagram },
  { keywords: ["youtube"], Icon: Youtube },
];

export const TECH_ICON_MATCHERS: TechMatcher[] = [
  { keywords: ["typescript", "ts"], Icon: SiTypescript },
  { keywords: ["javascript", "js"], Icon: SiJavascript },
  { keywords: ["react", "next.js"], Icon: SiReact },
  { keywords: ["python", "py"], Icon: SiPython },
  { keywords: ["java", "jvm"], Icon: SiOpenjdk },
  { keywords: ["go", "golang"], Icon: SiGo },
  { keywords: ["rust"], Icon: SiRust },
  { keywords: ["kotlin"], Icon: SiKotlin },
  { keywords: ["c++", "cpp"], Icon: SiCplusplus },
  { keywords: ["node", "backend"], Icon: SiNodedotjs },
  { keywords: ["docker"], Icon: SiDocker },
  { keywords: ["postgres", "sql"], Icon: SiPostgresql },
  { keywords: ["tailwind"], Icon: SiTailwindcss },
  { keywords: ["prisma"], Icon: SiPrisma },

  { keywords: ["bash", "terminal"], Icon: Terminal },
  { keywords: ["shared", "core"], Icon: Cpu },
  { keywords: ["web", "html"], Icon: Layout },
];
