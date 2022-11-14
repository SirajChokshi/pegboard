import { PropsWithChildren } from 'react';
import type { resizable, position, dimensions } from '../../types/board';
interface BoardItemProps extends PropsWithChildren {
    resizable?: resizable;
    maxWidth?: number;
    maxHeight?: number;
    minWidth?: number;
    minHeight?: number;
    defaultPosition?: position;
    defaultDimensions?: dimensions;
    liveResize?: boolean;
    livePosition?: boolean;
    className?: string;
}
export declare function BoardItem(props: BoardItemProps): JSX.Element;
export {};
