export declare type resizable = 'horizontal' | 'vertical' | 'both' | 'none';
export declare type horizontalDirection = 'e' | 'w';
export declare type verticalDirection = 'n' | 's';
export declare type diagonalDirection = `${verticalDirection}${horizontalDirection}`;
export declare type direction = horizontalDirection | verticalDirection | diagonalDirection;
export declare type dimensions = {
    width: number;
    height: number;
};
export declare type position = {
    x: number;
    y: number;
};
export interface BoardItemConfig {
    resizable?: resizable;
    position?: position;
    zIndex?: number;
    maxWidth: number;
    maxHeight: number;
    minWidth: number;
    minHeight: number;
    defaultDimensions: dimensions;
}
export interface BoardConfig {
    gridSize: number;
    dimensions: dimensions;
    canOverlap?: boolean;
    itemDefaults?: BoardItemConfig;
}
