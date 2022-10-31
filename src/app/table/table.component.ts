import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  ColumnNestingConfig,
  ColumnSelectingConfig,
  ColumnsTemplatesInterface,
  OpenedNestedRowTemplatesInterface,
  TableColumnInterface,
  TableConfigColumAliases,
  TableConfigColumInterface,
  TableConfigInterface,
  TableDataInterface,
  TableSelections,
} from './table.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  uuid: string = new Date().getTime() + '';
  TableSelections = TableSelections;
  TableConfigColumAliases = TableConfigColumAliases;

  columns: Set<TableColumnInterface> = new Set();

  @Input('config') config: TableConfigInterface = {
    columns: [{ label: 'Column', alias: 'column' }],
    uniqIdKey: 'id',
  };
  @Input('data') data: TableDataInterface[] = [];
  @Input('templates') templates: ColumnsTemplatesInterface = {};
  @Output('selectionChange') selectionChange: EventEmitter<
    Map<TableDataInterface, boolean>
  > = new EventEmitter();

  selectedItems: Map<TableDataInterface, boolean> = new Map();
  private opened: OpenedNestedRowTemplatesInterface = {};
  private lastSelectedItem!: TableDataInterface;

  constructor(private cdRef: ChangeDetectorRef) {}

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

    this.initSelectedItems();
  }

  isNestedOpened(item: TableDataInterface): boolean {
    return this.opened[item[this.config.uniqIdKey]];
  }

  onToggleNested(item: TableDataInterface): void {
    this.opened[item[this.config.uniqIdKey]] =
      !this.opened[item[this.config.uniqIdKey]];
  }

  onSelectAll(event: Event): void {
    for (const item of this.selectedItems.keys()) {
      this.selectedItems.set(item, (event.target as HTMLInputElement).checked);
    }
    this.cdRef.detectChanges();

    this.selectionChange.emit(this.selectedItems);
  }

  onSelectItem(item: TableDataInterface, event: Event): void {
    if (this.config.selection === TableSelections.Multiple) {
      this.selectedItems.set(item, (event.target as HTMLInputElement).checked);
    }

    if (this.config.selection === TableSelections.Single) {
      if (this.lastSelectedItem != null) {
        this.selectedItems.set(this.lastSelectedItem, false);
      }
      this.selectedItems.set(item, true);
      this.lastSelectedItem = item;
    }

    this.selectionChange.emit(this.selectedItems);
  }

  private initSelectedItems(): void {
    this.data.forEach((item) => {
      this.selectedItems.set(item, false);
    });
  }

  private initNesting(): void {
    this.columns.add(ColumnNestingConfig);
  }

  private initSelection(): void {
    this.columns.add(ColumnSelectingConfig);
  }
}
