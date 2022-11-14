import { MouseEvent as ReactMouseEvent } from 'react';
import { direction } from '../../types/board';
interface HandleProps {
    direction: direction;
    handler: (e: ReactMouseEvent, direction: direction) => void;
}
export declare function Handle({ direction, handler }: HandleProps): JSX.Element;
export {};
