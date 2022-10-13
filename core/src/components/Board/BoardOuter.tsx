import React, { createContext, PropsWithChildren, useMemo } from 'react'
import '../../styles/globals.scss'

type dimensions = {
  width: number
  height: number
}
interface BoardProps extends PropsWithChildren {
  className?: string
  gridSize: number
  width: number
  height: number
}

interface BoardContext {
  gridSize: number
  dimensions: dimensions
}

export const BoardContext = createContext<BoardContext>({} as BoardContext)

export function BoardOuter({
  children,
  width = 20,
  height = 20,
  className = '',
  gridSize,
}: BoardProps) {
  const cssVars = useMemo(
    () =>
      ({
        '--grid-size': `${gridSize}px`,
        width: gridSize * width,
        height: gridSize * height,
      } as React.CSSProperties),
    [gridSize],
  )

  const boardContext = {
    gridSize,
    dimensions: { width, height },
  }

  return (
    <BoardContext.Provider value={boardContext}>
      <div
        style={cssVars}
        className={`pegboard ${className}`}
        data-board-container
      >
        {/* <div data-board-grid> */}
        {children}
        {/* </div> */}
      </div>
    </BoardContext.Provider>
  )
}
