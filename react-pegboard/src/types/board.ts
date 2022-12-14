export type resizable = 'horizontal' | 'vertical' | 'both' | 'none'

export type horizontalDirection = 'e' | 'w'
export type verticalDirection = 'n' | 's'
export type diagonalDirection = `${verticalDirection}${horizontalDirection}`
export type direction =
  | horizontalDirection
  | verticalDirection
  | diagonalDirection

export type dimensions = {
  width: number
  height: number
}
export type position = {
  x: number
  y: number
}

export interface BoardItemConfig {
  resizable?: resizable
  // TODO: implement default to auto positioning
  position?: position
  zIndex?: number

  maxWidth: number
  maxHeight: number
  minWidth: number
  minHeight: number

  defaultDimensions: dimensions
}

export interface BoardConfig {
  // required
  gridSize: number
  dimensions: dimensions

  // optional
  canOverlap?: boolean
  itemDefaults?: BoardItemConfig
}
