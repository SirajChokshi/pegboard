import React, { PropsWithChildren, useMemo } from 'react'
import '../../styles/globals.scss'

import { BoardConfig } from '../../types/board'
import { BoardProvider } from './context'

interface BoardProps extends PropsWithChildren<BoardConfig> {
  className?: string
}

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

  return (
    <BoardProvider {...props}>
      <div
        style={cssVars}
        className={`pegboard ${className}`}
        data-board-container
      >
        {/* <div data-board-grid> */}
        {children}
        {/* </div> */}
      </div>
    </BoardProvider>
  )
}
