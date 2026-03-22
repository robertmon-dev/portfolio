import type { GridColumns, GridCSSVariables } from "./types";

export const getGridStyles = (
  columns: GridColumns,
  gap: string,
): GridCSSVariables => {
  return {
    "--grid-gap": gap,
    "--cols-default": columns.default || 1,
    "--cols-md": columns.md || 2,
    "--cols-lg": columns.lg || 3,
  };
};
