import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
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

  private opened: OpenedNestedRowTemplatesInterface = {};

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

  isNestedOpened(item: TableDataInterface): boolean {
    return this.opened[item[this.config.uniqIdKey]];
  }

  onToggleNested(item: TableDataInterface): void {
    this.opened[item[this.config.uniqIdKey]] =
      !this.opened[item[this.config.uniqIdKey]];
  }

  private initNesting(): void {
    this.columns.add(ColumnNestingConfig);
  }

  private initSelection(): void {
    this.columns.add(ColumnSelectingConfig);
  }
}
