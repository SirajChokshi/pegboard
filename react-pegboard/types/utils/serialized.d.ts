/// <reference types="react" />
import { BoardSerialized } from '../types/serialized';
export declare const Serialized: {
    getLength: (serializedBoard: BoardSerialized) => number;
    render: (serializedBoard: BoardSerialized) => JSX.Element[];
};
