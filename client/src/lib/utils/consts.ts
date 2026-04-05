import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  type LucideIcon,
} from "lucide-react";

export const ICON_MATCHERS: { keywords: string[]; Icon: LucideIcon }[] = [
  { keywords: ["mail", "mailto:"], Icon: Mail },
  { keywords: ["github"], Icon: Github },
  { keywords: ["linkedin"], Icon: Linkedin },
  { keywords: ["twitter", "x.com"], Icon: Twitter },
  { keywords: ["facebook"], Icon: Facebook },
  { keywords: ["instagram"], Icon: Instagram },
  { keywords: ["youtube"], Icon: Youtube },
];
