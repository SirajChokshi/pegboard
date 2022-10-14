import { BoardOuter } from './BoardOuter'
import { BoardItem } from './BoardItem'

type BoardContainer = typeof BoardOuter

interface BoardComponent extends BoardContainer {
  Item: typeof BoardItem
}

const Board = BoardOuter as BoardComponent
Board.Item = BoardItem

export { Board }
