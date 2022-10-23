import React, { createContext, PropsWithChildren, useMemo } from 'react'
import '../../styles/globals.scss'

import { BoardConfig } from '../../types/board'

interface BoardProps extends PropsWithChildren<BoardConfig> {
  className?: string
}

type BoardContext = BoardConfig

export const BoardContext = createContext<BoardContext>({} as BoardContext)

export function BoardOuter(props: BoardProps) {
  const {
    children,
    dimensions = {
      width: 20,
      height: 20,
    },
    className = '',
    gridSize,
  } = props

  const { width, height } = dimensions

  const cssVars = useMemo(
    () =>
      ({
        '--grid-size': `${gridSize}px`,
        width: gridSize * width,
        height: gridSize * height,
      } as React.CSSProperties),
    [gridSize, width, height],
  )

  const boardContext = props as BoardContext

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
