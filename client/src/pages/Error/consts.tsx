import { ShieldAlert, Ghost, ServerCrash } from "lucide-react";
import type { ErrorConfig } from "./types";

export const ERROR_CONFIG: ErrorConfig = {
  "404": {
    icon: Ghost,
    titleKey: "errors.404.title",
    descKey: "errors.404.description",
  },
  "403": {
    icon: ShieldAlert,
    titleKey: "errors.403.title",
    descKey: "errors.403.description",
  },
  "500": {
    icon: ServerCrash,
    titleKey: "errors.500.title",
    descKey: "errors.500.description",
  },
};
