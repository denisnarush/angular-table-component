import { Component, OnInit } from '@angular/core';
import { data } from './mock.data';
import { NestedConfig } from './nested.config';
import { SimpleConfig } from './simple.config';
import { TableDataInterface } from './table/table.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  SimpleConfig = SimpleConfig;
  NestedConfig = NestedConfig;
  data = data;

  selectedData!: Map<TableDataInterface, boolean>;

  constructor() {}

  ngOnInit(): void {}

  getDetails(item: any) {
    return this.data
      .filter((index) => index.id === item.id)
      .map((index) => index.friends)[0];
  }

  onSelectionChange(data: Map<TableDataInterface, boolean>): void {
    this.selectedData = data;
  }
}
