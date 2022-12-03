/* ▲▼△▽⇅↑↓ */
import isEqual from 'lodash-es/isEqual';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
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
  TableConfigSortingColumnInterface,
  TableConfigColumInterface,
  TableColumnType,
} from './table.interface';

@Component({
  selector: 'marketplace-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, OnChanges {
  @Input() config!: TableConfigInterface;
  @Input() data: TableDataInterface[] | null = null;
  @Input() defaultItems: Map<TableDataInterface, SelectedItemStateInterface> = new Map();
  @Input() templates: ColumnsTemplatesInterface = {};
  @Input() disabled = false;
  @Input() loading = false;

  @Output() selectionChange: EventEmitter<
    Map<TableDataInterface, SelectedItemStateInterface>
  > = new EventEmitter();
  @Output() sortChange: EventEmitter<
    Map<TableColumnInterface, TableConfigSortingColumnInterface>
  > = new EventEmitter();

  uuid: string = new Date().getTime() + '';
  columns: Set<TableColumnInterface> = new Set();

  sortedColumns: Map<TableColumnInterface, TableConfigSortingColumnInterface> = new Map();
  selectedItems: Map<TableDataInterface, SelectedItemStateInterface> = new Map();
  openedRows: Map<TableDataInterface, boolean> = new Map();

  // Enums
  TableSelections = TableActions;
  TableConfigColumAliases = TableConfigColumAliases;
  TableConfigSortingOrders = TableConfigSortingOrders;

  checkAllStatus: boolean | unknown = false;

  private lastSelectedRow!: TableDataInterface;
  private lastSortedColumn!: TableColumnInterface;

  ngOnInit(): void {
    this.columns = new Set();

    if (this.config == null) {
      return;
    }

    if (this.config.selection) {
      this.initSelection();
    }

    if (this.config.nesting) {
      this.initNesting();
    }

    this.config.columns.forEach(column => {
      this.columns.add({ ...column, type: this.getColumnType(column) });
    });

    if (this.config.sorting) {
      this.initSorting();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['defaultItems']) {
      this.initSelectedItems();
      this.selectionChange.emit(this.selectedItems);
    }

    if (changes['data']?.currentValue) {
      const data: TableDataInterface[] = changes['data'].currentValue;
      this.data = data.map((item) => {
        for (const key of this.selectedItems.keys()) {
          if (isEqual(item, key)) {
            return (item = key);
          }
        }
        return item;
      });
    }

    if (changes['data']) {
      this.udpateCheckAll();
    }

    if (changes['config']?.previousValue) {
      this.ngOnInit();
      this.initSelectedItems();
      this.selectionChange.emit(this.selectedItems);
    }
  }

  onToggleNesting(item: TableDataInterface): void {
    this.openedRows.set(item, !this.openedRows.get(item));
    this.openedRows = new Map(this.openedRows);
  }

  onToggleSorting(column: TableColumnInterface): void {
    if (this.config.sorting?.type === TableActions.Single) {
      if (column.alias !== this.lastSortedColumn?.alias) {
        this.sortedColumns.delete(this.lastSortedColumn);
        this.lastSortedColumn = column;
      }
    }

    switch (this.sortedColumns.get(column)?.order) {
      case TableConfigSortingOrders.Desc: {
        this.sortedColumns.set(column, { alias: column.alias, order: null });
        break;
      }
      case TableConfigSortingOrders.Asc: {
        this.sortedColumns.set(column, {
          alias: column.alias,
          order: TableConfigSortingOrders.Desc,
        });
        break;
      }
      default: {
        this.sortedColumns.set(column, {
          alias: column.alias,
          order: TableConfigSortingOrders.Asc,
        });
      }
    }

    this.sortedColumns = new Map(this.sortedColumns);
    this.sortChange.emit(this.sortedColumns);
  }

  onSelectAll(event: Event): void {
    this.data?.forEach(value => {
      const state = this.selectedItems.get(value);
      this.selectedItems.set(value, {
        selected:
          state && state.disabled
            ? state.selected
            : (event.target as HTMLInputElement).checked,
        disabled: state ? state.disabled : false,
      });
    });

    this.selectedItems = new Map(this.selectedItems);
    this.selectionChange.emit(this.selectedItems);
    this.udpateCheckAll();
  }

  onSelectItem(item: TableDataInterface, event: Event): void {
    if (this.config.selection === TableActions.Multiple) {
      this.selectedItems.set(item, {
        selected: (event.target as HTMLInputElement).checked,
        disabled: false,
      });
    }

    if (this.config.selection === TableActions.Single) {
      if (this.lastSelectedRow != null) {
        this.selectedItems.delete(this.lastSelectedRow);
      }
      this.selectedItems.set(item, { selected: true, disabled: false });
      this.lastSelectedRow = item;
    }

    this.selectedItems = new Map(this.selectedItems);
    this.selectionChange.emit(this.selectedItems);
    this.udpateCheckAll();
  }

  reset(): void {
    this.selectedItems = new Map();
    this.openedRows = new Map();
  }

  private initSelectedItems(): void {
    this.defaultItems.forEach((state, item) => {
      if (this.config.selection === TableActions.Single) {
        if (state.selected && this.lastSelectedRow == null) {
          this.lastSelectedRow = item;
        }
      }

      if (this.config.selection === TableActions.Multiple) {
        // INFO: No action for now
      }

      this.selectedItems.set(item, {
        selected: state.selected,
        disabled: state.disabled,
      });
    });
  }

  private initNesting(): void {
    this.columns.add(ColumnNestingConfig);
  }

  private initSelection(): void {
    this.columns.add(ColumnSelectingConfig);
  }

  private initSorting(): void {
    this.sortedColumns = new Map();

    if (!this.config.sorting || this.config.sorting.columns.length === 0) {
      return;
    }

    if (this.config.sorting.type === TableActions.Single) {
      const columnWithSorting = this.config.sorting.columns[0];
      const column = Array.from(this.columns.values()).find(
        item => columnWithSorting.alias === item.alias,
      );

      if (column) {
        this.sortedColumns.set(column, {
          alias: column.alias,
          order: columnWithSorting.order,
        });

        this.lastSortedColumn = column;
      }
    }

    if (this.config.sorting.type === TableActions.Multiple) {
      this.config.sorting.columns.forEach(columnWithSorting => {
        const column = Array.from(this.columns.values()).find(
          item => columnWithSorting.alias === item.alias,
        );

        if (column) {
          this.sortedColumns.set(column, {
            alias: column.alias,
            order: columnWithSorting.order,
          });
        }
      });
    }
  }

  private getColumnType(column: TableConfigColumInterface): TableColumnType {
    if (
      this.config.sorting !== null &&
      this.config.sorting?.columns.find(index => index.alias === column.alias)
    ) {
      return TableConfigColumAliases.Sorting;
    }

    return TableConfigColumAliases.Regular;
  }

  private udpateCheckAll(): void {
    if (this.data == null) {
      this.checkAllStatus = false;
      return;
    }

    let numberOfItems = this.data.length;
    let numberOfSelected = 0;

    this.data.forEach(item => {
      const state = this.selectedItems.get(item);

      if (state) {
        if (state.selected) {
          numberOfSelected += 1;
        }

        if (state.disabled) {
          numberOfItems -= 1;
        }
      }
    });

    switch (numberOfSelected) {
      case 0: {
        this.checkAllStatus = false;
        break;
      }
      case numberOfItems: {
        this.checkAllStatus = true;
        break;
      }
      default:
        this.checkAllStatus = 'some';
    }
  }
}
