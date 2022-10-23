import React, { MouseEvent } from 'react'

import { direction } from '../../types/board'

interface HandleProps {
  direction: direction
  handler: (e: MouseEvent, direction: direction) => void
}

// TODO - schokshi: a11y
/*
 * Considering using the 'spinbutton' role for the handles
 *  - Figure out how expensive it is to calculate the new size
 *  - Keyboard a11y via tabIndex (shift + arrow keys)
 *    - // TODO - schokshi: do we handle this in the parent and keep this component dumb?
 *
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/spinbutton_role
 */

export function Handle({ direction, handler }: HandleProps) {
  return (
    <div
      data-board-item-handle={direction}
      onMouseDown={(e: MouseEvent) => handler(e, direction)}
    />
  )
}
