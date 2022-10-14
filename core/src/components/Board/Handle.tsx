import React, { MouseEvent } from 'react'

import { direction } from '../../types/board'

interface HandleProps {
  direction: direction
  handler: (e: MouseEvent, direction: direction) => void
}

export function Handle({ direction, handler }: HandleProps) {
  return (
    <div
      data-board-item-handle={direction}
      onMouseDown={(e: MouseEvent) => handler(e, direction)}
    />
  )
}
