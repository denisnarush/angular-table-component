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
  @Output() sortingChange: EventEmitter<{
    [A: string]: TableConfigSortingOrderType;
  }> = new EventEmitter();

  uuid: string = new Date().getTime() + '';
  columns: Set<TableColumnInterface> = new Set();

  sortedColumns: { [A: string]: TableConfigSortingOrderType } = {};

  selectedItems: Map<TableDataInterface, SelectedItemStateInterface> =
    new Map();
  openedRows: Map<TableDataInterface, boolean> = new Map();

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
    this.openedRows.set(item, !this.openedRows.get(item));
    this.openedRows = new Map(this.openedRows);
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
      if (this.lastSelectedItem != null) {
        const state = this.selectedItems.get(this.lastSelectedItem);
        this.selectedItems.set(item, {
          selected: false,
          disabled: state ? state.disabled : false,
        });
      }
      this.selectedItems.set(item, { selected: true, disabled: false });
      this.lastSelectedItem = item;
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
        this.lastSelectedItem = item;
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
