import { BoardOuter } from './BoardOuter';
import { BoardItem } from './BoardItem';
declare type BoardContainer = typeof BoardOuter;
interface BoardComponent extends BoardContainer {
    Item: typeof BoardItem;
}
declare const Board: BoardComponent;
export { Board };
