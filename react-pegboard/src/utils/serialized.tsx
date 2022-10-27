import React from 'react'
import { BoardItem } from '../components/Board/BoardItem'
import { BoardSerialized } from '../types/serialized'

export const Serialized = {
  getLength: (serializedBoard: BoardSerialized) => {
    const { items } = serializedBoard
    return Object.keys(items).length
  },

  render: (serializedBoard: BoardSerialized) => {
    const { items } = serializedBoard
    return Object.keys(items).map((key) => {
      const item = items[key]
      return <BoardItem {...item} />
    })
  },
}
