import { TemplateRef } from '@angular/core';

export type TableConfigUniqIdKeyType = string;

export type TableConfigSortingOrderType = 'ASC' | 'DESC' | null;
export enum TableConfigSortingOrders {
  Asc = 'ASC',
  Desc = 'DESC',
}

type TableActionType = 'SINGLE' | 'MULTIPLE';
export enum TableActions {
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
  Sorting = 'SORTING',
}

export interface TableConfigInterface {
  caption?: string;
  columns: TableConfigColumInterface[];
  uniqIdKey: TableConfigUniqIdKeyType;
  selection?: TableActionType;
  nesting?: boolean;
  // allows open only one nested table at a time
  nestingIsSingle?: boolean;
  sorting?: TableConfigSortingInterface;
}

export interface TableDataInterface {
  [Key: string]: any;
}

export interface TableConfigColumInterface {
  label: string;
  alias: TableConfigColumAliasType;
  width?: string;
}

export interface TableConfigSortingColumnInterface {
  alias: string;
  order: TableConfigSortingOrderType;
}

export interface TableConfigSortingInterface {
  type: TableActionType;
  columns: TableConfigSortingColumnInterface[];
}

export type TableColumnType =
  | TableConfigColumAliases.Regular
  | TableConfigColumAliases.Nesting
  | TableConfigColumAliases.Selecting
  | TableConfigColumAliases.Sorting;

export interface TableColumnInterface extends TableConfigColumInterface {
  type: TableColumnType;
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
