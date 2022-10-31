import { TemplateRef } from '@angular/core';

type TableSelectionType = 'SINGLE' | 'MULTIPLE';
export enum TableSelections {
  Single = 'SINGLE',
  Multiple = 'MULTIPLE',
}

type TableConfigColumAliasType =
  | TableConfigColumAliases.Selecting
  | TableConfigColumAliases.Nesting
  | string;

export enum TableConfigColumAliases {
  Nesting = 'NESTING',
  Selecting = 'SELECTING',
}

export interface TableConfigInterface {
  caption?: string;
  columns: TableConfigColumInterface[];
  uniqIdKey: string;
  selection?: TableSelectionType;
  nesting?: boolean;
}

export interface TableDataInterface {
  [Key: string]: any;
}

export interface TableConfigColumInterface {
  label: string;
  alias: TableConfigColumAliasType;
  width?: string;
}

export interface ColumnsTemplatesInterface {
  [ColumnAlias: string]: TemplateRef<any>;
}

export interface OpenedNestedRowTemplatesInterface {
  [uid: string]: boolean;
}

export const ColumnNestingConfig: TableConfigColumInterface = {
  label: '',
  alias: TableConfigColumAliases.Nesting,
  width: '0',
};

export const ColumnSelectingConfig: TableConfigColumInterface = {
  label: '',
  alias: TableConfigColumAliases.Selecting,
  width: '0',
};
