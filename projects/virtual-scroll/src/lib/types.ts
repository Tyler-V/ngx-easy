export interface ScrollEvent {
    type: ScrollType;
    index?: ScrollIndex;
    scrollLeft?: number;
}

export interface ScrollIndex {
    start?: number;
    end?: number;
}

export enum ScrollType {
    Horizontal = 'Horizontal',
    Vertical = 'Vertical'
}
