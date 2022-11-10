import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import {
  ColumnNestingConfig,
  ColumnSelectingConfig,
  ColumnsTemplatesInterface,
  OpenedNestedRowTemplatesInterface,
  SelectedItemStateInterface,
  TableColumnInterface,
  TableConfigColumAliases,
  TableConfigInterface,
  TableDataInterface,
  TableActions,
  TableConfigSortingOrders,
  TableConfigSortingOrderType,
  TableConfigSortingColumnInterface,
  TableConfigColumInterface,
} from './table.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, OnChanges {
  @Input() config!: TableConfigInterface;
  @Input() data: TableDataInterface[] | null = null;
  @Input() defaultItems: Map<TableDataInterface, SelectedItemStateInterface> =
    new Map();
  @Input() templates: ColumnsTemplatesInterface = {};

  @Output() selectionChange: EventEmitter<
    Map<TableDataInterface, SelectedItemStateInterface>
  > = new EventEmitter();
  @Output() sortingChange: EventEmitter<
    Map<TableColumnInterface, TableConfigSortingOrderType>
  > = new EventEmitter();

  uuid: string = new Date().getTime() + '';
  columns: Set<TableColumnInterface> = new Set();
  selectedItems: Map<TableDataInterface, SelectedItemStateInterface> =
    new Map();
  sortedColumns: Map<TableColumnInterface, TableConfigSortingOrderType> =
    new Map();

  // Enums
  TableSelections = TableActions;
  TableConfigColumAliases = TableConfigColumAliases;
  TableConfigSortingOrders = TableConfigSortingOrders;

  private opened: OpenedNestedRowTemplatesInterface = {};
  private lastSelectedItem!: TableDataInterface;

  ngOnInit(): void {
    if (this.config == null) {
      return;
    }

    if (this.config.selection) {
      this.initSelection();
    }

    this.config.columns.forEach((column) => {
      this.columns.add({ ...column, type: this.getColumnType(column) });
    });

    if (this.config.nesting) {
      this.initNesting();
    }

    this.initSorting();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['defaultItems']) {
      this.initSelectedItems();
      this.selectionChange.emit(this.selectedItems);
    }

    if (changes['data']?.currentValue !== null) {
      this.initSelectedItems();
    }
  }

  isNestedOpened(item: TableDataInterface): boolean {
    return this.opened[item[this.config.uniqIdKey]];
  }

  getSrotingOrder(column: TableColumnInterface): TableConfigSortingOrderType {
    const order = this.sortedColumns.get(column);
    return order ? order : null;
  }

  onToggleNesting(item: TableDataInterface): void {
    this.opened[item[this.config.uniqIdKey]] =
      !this.opened[item[this.config.uniqIdKey]];
  }

  onToggleSorting(column: TableColumnInterface): void {
    if (this.config.sorting?.type === TableActions.Single) {
      // TODO: Set last sorted column order to `null`
    }

    switch (this.sortedColumns.get(column)) {
      case TableConfigSortingOrders.Desc: {
        this.sortedColumns.set(column, null);
        break;
      }
      case TableConfigSortingOrders.Asc: {
        this.sortedColumns.set(column, TableConfigSortingOrders.Desc);
        break;
      }
      case null: {
        this.sortedColumns.set(column, TableConfigSortingOrders.Asc);
      }
    }

    this.sortingChange.emit(this.sortedColumns);
  }

  onSelectAll(event: Event): void {
    for (const [item, state] of this.selectedItems.entries()) {
      this.selectedItems.set(item, {
        selected: state.disabled
          ? state.selected
          : (event.target as HTMLInputElement).checked,
        disabled: state.disabled,
      });
    }

    this.selectionChange.emit(this.selectedItems);
  }

  onSelectItem(item: TableDataInterface, event: Event): void {
    if (this.config.selection === TableActions.Multiple) {
      this.selectedItems.set(item, {
        selected: (event.target as HTMLInputElement).checked,
        disabled: false,
      });
    }

    if (this.config.selection === TableActions.Single) {
      if (this.lastSelectedItem != null) {
        const state = this.selectedItems.get(this.lastSelectedItem);
        this.selectedItems.set(this.lastSelectedItem, {
          selected: false,
          disabled: state ? state.disabled : false,
        });
      }
      this.selectedItems.set(item, { selected: true, disabled: false });
      this.lastSelectedItem = item;
    }

    this.selectionChange.emit(this.selectedItems);
  }

  getValue(object: TableDataInterface, keys: string | string[]): string | null {
    keys = Array.isArray(keys) ? keys : keys.split('.');
    object = object[keys[0]];
    if (object && keys.length > 1) {
      return this.getValue(object, keys.slice(1));
    }
    return object == null ? null : `${object}`;
  }

  private initSelectedItems(): void {
    this.data?.forEach((item) => {
      const defaultItem = this.defaultItems.get(item);
      this.selectedItems.set(item, {
        selected: defaultItem ? defaultItem.selected : false,
        disabled: defaultItem ? defaultItem.disabled : false,
      });
      this.lastSelectedItem = defaultItem?.selected
        ? item
        : this.lastSelectedItem;
    });
  }

  private initNesting(): void {
    this.columns.add(ColumnNestingConfig);
  }

  private initSelection(): void {
    this.columns.add(ColumnSelectingConfig);
  }

  private initSorting(): void {
    if (this.config.sorting == null) {
      return;
    }

    let columnsWithSorting: TableConfigSortingColumnInterface[] = [];

    if (this.config.sorting.type === TableActions.Single) {
      const columnWithSorting = this.config.sorting?.columns.find(
        (column) => column.order !== null
      );

      if (columnWithSorting) {
        columnsWithSorting.push(columnWithSorting);
      }
    }

    if (this.config.sorting.type === TableActions.Multiple) {
      columnsWithSorting =
        this.config.sorting?.columns.filter(
          (column) => column.order !== null
        ) || [];
    }

    columnsWithSorting.forEach((columnWithSorting) => {
      const column = Array.from(this.columns.values()).find(
        (column) => columnWithSorting.alias === column.alias
      );

      if (column) {
        this.sortedColumns.set(column, columnWithSorting.order);
      }
    });
  }

  private getColumnType(
    column: TableConfigColumInterface
  ): TableConfigColumAliases.Regular | TableConfigColumAliases.Sorting {
    if (
      this.config.sorting !== null &&
      this.config.sorting?.columns.find((index) => index.alias === column.alias)
    ) {
      return TableConfigColumAliases.Sorting;
    }

    return TableConfigColumAliases.Regular;
  }
}
