import { TemplateRef } from '@angular/core';

type TableSelectionType = 'SINGLE' | 'MULTIPLE';
export enum TableSelections {
  Single = 'SINGLE',
  Multiple = 'MULTIPLE',
}

export interface TableConfigInterface {
  caption?: string;
  columns: TableConfigColumInterface[];
  selection?: TableSelectionType;
  nesting?: boolean;
}
export interface TableConfigColumInterface {
  label: string;
  alias: string;
  width?: string;
}
export interface ColumnsTemplatesInterface {
  [ColumnAlias: string]: TemplateRef<any>;
}

export interface OpenedNestedRowTemplatesInterface {
  [uid: string]: boolean;
}
