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

  @Output() selectionChange: EventEmitter<{
    [K: string]: SelectedItemStateInterface;
  }> = new EventEmitter();
  @Output() sortingChange: EventEmitter<{
    [A: string]: TableConfigSortingOrderType;
  }> = new EventEmitter();

  uuid: string = new Date().getTime() + '';
  columns: Set<TableColumnInterface> = new Set();

  openedRows: { [K: string]: boolean } = {};
  sortedColumns: { [A: string]: TableConfigSortingOrderType } = {};
  selectedItems: { [K: string]: SelectedItemStateInterface } = {};

  // Enums
  TableSelections = TableActions;
  TableConfigColumAliases = TableConfigColumAliases;
  TableConfigSortingOrders = TableConfigSortingOrders;

  private lastSelectedItem!: TableDataInterface;
  private lastSortedItem!: string;

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
    if (this.config.sorting) {
      this.initSorting();
    }
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

  onToggleNesting(item: TableDataInterface): void {
    this.openedRows[item[this.config.uniqIdKey]] =
      !this.openedRows[item[this.config.uniqIdKey]];
  }

  onToggleSorting(column: TableColumnInterface): void {
    if (this.config.sorting?.type === TableActions.Single) {
      if (column.alias !== this.lastSortedItem) {
        delete this.sortedColumns[this.lastSortedItem];
        this.lastSortedItem = column.alias;
      }
    }

    switch (this.sortedColumns[column.alias]) {
      case TableConfigSortingOrders.Desc: {
        this.sortedColumns[column.alias] = null;
        break;
      }
      case TableConfigSortingOrders.Asc: {
        this.sortedColumns[column.alias] = TableConfigSortingOrders.Desc;
        break;
      }
      default: {
        this.sortedColumns[column.alias] = TableConfigSortingOrders.Asc;
      }
    }

    this.sortingChange.emit(this.sortedColumns);
  }

  onSelectAll(event: Event): void {
    for (const uniqIdKey in this.selectedItems) {
      this.selectedItems[uniqIdKey] = {
        selected: this.selectedItems[uniqIdKey].disabled
          ? this.selectedItems[uniqIdKey].selected
          : (event.target as HTMLInputElement).checked,
        disabled: this.selectedItems[uniqIdKey].disabled,
      };
    }

    this.selectionChange.emit(this.selectedItems);
  }

  onSelectItem(item: TableDataInterface, event: Event): void {
    if (this.config.selection === TableActions.Multiple) {
      this.selectedItems[item[this.config.uniqIdKey]] = {
        selected: (event.target as HTMLInputElement).checked,
        disabled: false,
      };
    }

    if (this.config.selection === TableActions.Single) {
      if (this.lastSelectedItem != null) {
        const state =
          this.selectedItems[this.lastSelectedItem[this.config.uniqIdKey]];
        this.selectedItems[this.lastSelectedItem[this.config.uniqIdKey]] = {
          selected: false,
          disabled: state ? state.disabled : false,
        };
      }
      this.selectedItems[item[this.config.uniqIdKey]] = {
        selected: true,
        disabled: false,
      };
      this.lastSelectedItem = item;
    }

    this.selectionChange.emit(this.selectedItems);
  }

  private initSelectedItems(): void {
    this.data?.forEach((item) => {
      const defaultItem = this.defaultItems.get(item);
      this.selectedItems[item[this.config.uniqIdKey]] = {
        selected: defaultItem ? defaultItem.selected : false,
        disabled: defaultItem ? defaultItem.disabled : false,
      };
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
    let columnsWithSorting: TableConfigSortingColumnInterface[] = [];

    if (this.config.sorting?.type === TableActions.Single) {
      const columnWithSorting = this.config.sorting?.columns.find(
        (column) => column.order !== null
      );

      if (columnWithSorting) {
        columnsWithSorting.push(columnWithSorting);
        this.lastSortedItem = columnWithSorting.alias;
      }
    }

    if (this.config.sorting?.type === TableActions.Multiple) {
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
        this.sortedColumns[column.alias] = columnWithSorting.order;
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
