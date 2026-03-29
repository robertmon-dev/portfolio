import {
  ShieldAlert,
  Ghost,
  ServerCrash,
  WifiOff,
  Timer,
  AlertTriangle,
} from "lucide-react";
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
    descKey: "errors.codes.500.description",
  },
  "429": {
    icon: Timer,
    titleKey: "errors.429.title",
    descKey: "errors.429.description",
  },
  UNKNOWN_ERROR: {
    icon: AlertTriangle,
    titleKey: "errors.UNKNOWN_ERROR.title",
    descKey: "errors.UNKNOWN_ERROR.description",
  },
  offline: {
    icon: WifiOff,
    titleKey: "errors.NETWORK_ERROR.title",
    descKey: "errors.NETWORK_ERROR.description",
  },
};
