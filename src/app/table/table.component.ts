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

  @Output() selectionChange: EventEmitter<
    Map<TableDataInterface, SelectedItemStateInterface>
  > = new EventEmitter();
  @Output() sortingChange: EventEmitter<
    Map<TableColumnInterface, TableConfigSortingColumnInterface>
  > = new EventEmitter();

  uuid: string = new Date().getTime() + '';
  columns: Set<TableColumnInterface> = new Set();

  sortedColumns: Map<TableColumnInterface, TableConfigSortingColumnInterface> =
    new Map();
  selectedItems: Map<TableDataInterface, SelectedItemStateInterface> =
    new Map();
  openedRows: Map<TableDataInterface, boolean> = new Map();

  // Enums
  TableSelections = TableActions;
  TableConfigColumAliases = TableConfigColumAliases;
  TableConfigSortingOrders = TableConfigSortingOrders;

  private lastSelectedRow!: TableDataInterface;
  private lastSortedColumn!: TableColumnInterface;

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
    this.openedRows.set(item, !this.openedRows.get(item));
    this.openedRows = new Map(this.openedRows);
  }

  onToggleSorting(column: TableColumnInterface): void {
    if (this.config.sorting?.type === TableActions.Single) {
      if (column.alias === this.lastSortedColumn?.alias) {
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
    this.sortingChange.emit(this.sortedColumns);
  }

  onSelectAll(event: Event): void {
    for (const [item, state] of this.selectedItems) {
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
      if (this.lastSelectedRow != null) {
        const state = this.selectedItems.get(this.lastSelectedRow);
        this.selectedItems.set(item, {
          selected: false,
          disabled: state ? state.disabled : false,
        });
      }
      this.selectedItems.set(item, { selected: true, disabled: false });
      this.lastSelectedRow = item;
    }

    this.selectionChange.emit(this.selectedItems);
  }

  private initSelectedItems(): void {
    this.data?.forEach((item) => {
      const state = this.defaultItems.get(item);
      this.selectedItems.set(item, {
        selected: state ? state.selected : false,
        disabled: state ? state.disabled : false,
      });
    });

    if (this.config.selection === TableActions.Single) {
      const item = Array.from(this.defaultItems.entries()).find(
        ([item, state]) => item && state.selected
      );
      if (item) {
        this.lastSelectedRow = item;
      }
    }
  }

  private initNesting(): void {
    this.columns.add(ColumnNestingConfig);
  }

  private initSelection(): void {
    this.columns.add(ColumnSelectingConfig);
  }

  private initSorting(): void {
    let columnsWithSorting: TableConfigSortingColumnInterface[] = [];

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
        this.sortedColumns.set(column, {
          alias: column.alias,
          order: columnWithSorting.order,
        });

        this.lastSortedColumn = column;
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
