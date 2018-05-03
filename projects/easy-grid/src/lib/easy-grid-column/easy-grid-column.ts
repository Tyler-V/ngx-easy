import { TemplateRef } from '@angular/core';
import { EasySort } from '../easy-grid-header/sorting';
import { EasyFilter } from '../easy-grid-header/filtering';

export interface EasyGridColumn {
    index: number;
    title: string;
    field: string;
    width: number;
    type: EasyGridColumnType;
    template: TemplateRef<any>;
    sortable: boolean;
    sort: EasySort;
    sorting: boolean;
    filterable: boolean;
    filterText: string;
    filter: EasyFilter;
    filtering: boolean;
}

export enum EasyGridColumnType {
    String,
    Date,
    Number,
    Boolean
}
