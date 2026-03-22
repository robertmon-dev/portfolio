import type { ReactNode, CSSProperties } from "react";

export interface GridColumns {
  default?: number;
  md?: number;
  lg?: number;
}

export interface EntityGridProps<T> {
  data: T[];
  renderItem: (item: T) => ReactNode;
  columns?: GridColumns;
  gap?: string;
  isLoading?: boolean;
  loadingItemsCount?: number;
  className?: string;
}

export interface GridCSSVariables extends CSSProperties {
  "--grid-gap"?: string;
  "--cols-default"?: number;
  "--cols-md"?: number;
  "--cols-lg"?: number;
}
