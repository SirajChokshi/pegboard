import { direction, resizable } from '../types/board'

export const DIRECTION_TO_RESIZABLE: Record<direction, resizable> = {
  n: 'vertical',
  s: 'vertical',
  e: 'horizontal',
  w: 'horizontal',
  ne: 'both',
  nw: 'both',
  se: 'both',
  sw: 'both',
}

export const DIRECTION_TO_CURSOR: Record<direction, string> = {
  n: 'ns-resize',
  s: 'ns-resize',
  e: 'ew-resize',
  w: 'ew-resize',
  ne: 'nesw-resize',
  nw: 'nwse-resize',
  se: 'nwse-resize',
  sw: 'nesw-resize',
}
