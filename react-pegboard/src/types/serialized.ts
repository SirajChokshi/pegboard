import { BoardConfig, BoardItemConfig, dimensions } from './board'

type boardItemId = string

export interface BoardItemSerialized
  extends Omit<BoardItemConfig, 'defaultDimensions'> {
  id: boardItemId
  dimensions: dimensions
}

export interface BoardSerialized extends BoardConfig {
  items: BoardItemSerialized[]
}
