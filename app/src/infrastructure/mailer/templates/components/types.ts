import type { Locale } from "@portfolio/shared";

export interface LayoutProps {
  children: React.ReactNode;
  previewText: string;
  locale: Locale;
}
