import React, { PropsWithChildren, useMemo } from 'react'
import '../../styles/globals.scss'

interface BoardProps extends PropsWithChildren {
  className?: string
  gridSize: number
}

export function BoardOuter({ children, className = '', gridSize }: BoardProps) {
  const cssVars = useMemo(
    () =>
      ({
        '--grid-size': `${gridSize}px`,
        width: gridSize * 20,
        height: gridSize * 20,
      } as React.CSSProperties),
    [gridSize],
  )

  return (
    <div
      style={cssVars}
      className={`pegboard ${className}`}
      data-board-container
    >
      {/* <div data-board-grid> */}
      {children}
      {/* </div> */}
    </div>
  )
}
