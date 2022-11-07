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
  TableSelections,
} from './table.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, OnChanges {
  @Input() config: TableConfigInterface = {
    columns: [{ label: 'Column', alias: 'column' }],
    uniqIdKey: 'id',
  };
  @Input() data: TableDataInterface[] = [];
  @Input() defaultItems: Map<TableDataInterface, SelectedItemStateInterface> =
    new Map();
  @Input() templates: ColumnsTemplatesInterface = {};
  @Output() selectionChange: EventEmitter<
    Map<TableDataInterface, SelectedItemStateInterface>
  > = new EventEmitter();
  uuid: string = new Date().getTime() + '';
  TableSelections = TableSelections;
  TableConfigColumAliases = TableConfigColumAliases;

  columns: Set<TableColumnInterface> = new Set();
  selectedItems: Map<TableDataInterface, SelectedItemStateInterface> =
    new Map();

  private opened: OpenedNestedRowTemplatesInterface = {};
  private lastSelectedItem!: TableDataInterface;

  ngOnInit(): void {
    if (this.config.selection) {
      this.initSelection();
    }
    this.config.columns.forEach((column) => {
      this.columns.add({ ...column, type: TableConfigColumAliases.Regular });
    });
    if (this.config.nesting) {
      this.initNesting();
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

  isNestedOpened(item: TableDataInterface): boolean {
    return this.opened[item[this.config.uniqIdKey]];
  }

  onToggleNested(item: TableDataInterface): void {
    this.opened[item[this.config.uniqIdKey]] =
      !this.opened[item[this.config.uniqIdKey]];
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
    if (this.config.selection === TableSelections.Multiple) {
      this.selectedItems.set(item, {
        selected: (event.target as HTMLInputElement).checked,
        disabled: false,
      });
    }

    if (this.config.selection === TableSelections.Single) {
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
    this.data.forEach((item) => {
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
}
