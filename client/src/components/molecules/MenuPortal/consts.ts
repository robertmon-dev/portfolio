import type { Position } from "./types"

export const getStyle = (coords: Position, minWidth?: number | 'anchor') => {
  return {
    top: `${coords.top}px`,
    left: `${coords.left}px`,
    minWidth: minWidth === 'anchor' ? `${coords.width}px` : minWidth
  }
}
