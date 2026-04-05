import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import {
  Atom,
  Database,
  Server,
  Layout,
  Code2,
  Terminal,
  Box,
  Palette,
  Workflow,
  Cpu,
} from "lucide-react";
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
  { keywords: ["react", "next.js", "frontend"], Icon: Atom },
  { keywords: ["typescript", "javascript", "js", "ts"], Icon: Code2 },
  { keywords: ["node", "express", "fastify", "backend"], Icon: Server },
  {
    keywords: ["postgres", "sql", "redis", "mongodb", "database", "db"],
    Icon: Database,
  },
  { keywords: ["docker", "container", "kubernetes"], Icon: Box },
  { keywords: ["tailwind", "css", "sass", "style", "ui"], Icon: Palette },
  { keywords: ["prisma", "orm", "trpc", "api"], Icon: Workflow },
  { keywords: ["bash", "script", "linux", "terminal"], Icon: Terminal },
  { keywords: ["shared", "core", "architecture"], Icon: Cpu },
  { keywords: ["web", "browser", "html"], Icon: Layout },
];
