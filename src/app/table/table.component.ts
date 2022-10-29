import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  ColumnsTemplatesInterface,
  OpenedNestedRowTemplatesInterface,
  TableConfigInterface,
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

  @Input('config') config: TableConfigInterface = {
    columns: [{ label: 'Column', alias: 'column' }],
  };
  @Input('data') data: any[] = [];
  @Input('templates') templates: ColumnsTemplatesInterface = {};

  private opened: OpenedNestedRowTemplatesInterface = {};

  ngOnInit(): void {
    if (this.config.nesting) {
      this.initNesting();
    }

    if (this.config.selection) {
      this.initSelection();
    }
  }

  isNestedOpened(item: any): boolean {
    return this.opened[item.id];
  }

  toggleNested(item: any): void {
    if (this.opened[item.id] == null) {
      this.opened[item.id] = true;
    } else {
      this.opened[item.id] = !this.opened[item.id];
    }
  }

  private initNesting(): void {
    this.config.columns = this.config.columns.filter(
      (index) => index.alias != 'nesting'
    );
    this.config.columns.push({
      label: '',
      alias: 'nesting',
      width: '0',
    });
  }

  private initSelection(): void {
    this.config.columns = this.config.columns.filter(
      (index) => index.alias != 'selecting'
    );
    this.config.columns.unshift({
      label: '',
      alias: 'selecting',
      width: '0',
    });
  }
}
