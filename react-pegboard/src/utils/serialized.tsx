import React from 'react'
import { BoardItem } from '../components/Board/BoardItem'
import { BoardSerialized } from '../types/serialized'

export const Serialized = {
  getLength: (serializedBoard: BoardSerialized) => {
    const { items } = serializedBoard
    return items.length
  },

  render: (serializedBoard: BoardSerialized) => {
    const { items } = serializedBoard
    return items.map((item) => <BoardItem {...item} />)
  },

  validate: (serializedBoard: BoardSerialized) => {
    const { items } = serializedBoard
    return items.every((item) => item.position !== undefined)
  },
}
