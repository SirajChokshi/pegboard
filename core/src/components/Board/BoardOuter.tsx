import React, { PropsWithChildren, useMemo } from 'react'

interface BoardProps extends PropsWithChildren {
  className?: string
  gridSize: number
}

export function BoardOuter({ children, className, gridSize }: BoardProps) {
  const cssVars = useMemo(
    () =>
      ({
        '--grid-size': gridSize,
      } as React.CSSProperties),
    [gridSize],
  )

  return (
    <div
      style={cssVars}
      className={`pegboard ${className}`}
      data-board-container
    >
      <div data-board-grid>{children}</div>
    </div>
  )
}
