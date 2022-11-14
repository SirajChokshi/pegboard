import React, { PropsWithChildren } from 'react';
import '../../styles/globals.scss';
import { BoardConfig } from '../../types/board';
interface BoardProps extends PropsWithChildren<BoardConfig> {
    className?: string;
}
export declare const BoardContext: React.Context<BoardConfig>;
export declare function BoardOuter(props: BoardProps): JSX.Element;
export {};
