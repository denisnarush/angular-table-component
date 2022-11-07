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
  Regular = 'REGULAR',
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

export interface TableColumnInterface extends TableConfigColumInterface {
  type:
    | TableConfigColumAliases.Regular
    | TableConfigColumAliases.Nesting
    | TableConfigColumAliases.Selecting;
}

export interface ColumnsTemplatesInterface {
  [ColumnAlias: string]: TemplateRef<any>;
}

export interface OpenedNestedRowTemplatesInterface {
  [uid: string]: boolean;
}

export interface SelectedItemStateInterface {
  selected: boolean;
  disabled: boolean;
}

export const ColumnNestingConfig: TableColumnInterface = {
  label: '',
  alias: TableConfigColumAliases.Nesting,
  type: TableConfigColumAliases.Nesting,
  width: '0',
};

export const ColumnSelectingConfig: TableColumnInterface = {
  label: '',
  alias: TableConfigColumAliases.Selecting,
  type: TableConfigColumAliases.Selecting,
  width: '0',
};
