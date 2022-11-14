import React, { createContext, PropsWithChildren, useContext } from 'react'
import { BoardConfig } from '../../types/board'

type BoardContext = BoardConfig

export const BoardContext = createContext<BoardContext>({} as BoardContext)

export function BoardProvider(props: PropsWithChildren<BoardConfig>) {
  const boardContext = props as BoardContext

  return (
    <BoardContext.Provider value={boardContext}>
      {props.children}
    </BoardContext.Provider>
  )
}

export function useBoardContext() {
  return useContext(BoardContext)
}
