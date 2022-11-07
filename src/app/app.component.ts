import { Component, OnInit } from '@angular/core';
import { data } from './mock.data';
import { NestedConfig } from './nested.config';
import { SimpleConfig } from './simple.config';
import {
  SelectedItemStateInterface,
  TableDataInterface,
} from './table/table.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  SimpleConfig = SimpleConfig;
  NestedConfig = NestedConfig;
  data = data;
  data2 = [
    {
      id: 0,
      name: 'Lucinda Ballard',
    },
    {
      id: 1,
      name: 'Marisa Weeks',
    },
    {
      id: 2,
      name: 'Velasquez Walton',
    },
  ];

  selectedData!: Map<TableDataInterface, SelectedItemStateInterface>;
  defaultItems: Map<TableDataInterface, SelectedItemStateInterface> = new Map();
  defaultItems2: Map<TableDataInterface, SelectedItemStateInterface> =
    new Map();

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      const defaultItems = new Map();
      defaultItems.set(this.data[1], {
        selected: true,
        disabled: true,
      });

      this.defaultItems = defaultItems;
    }, 1000);

    const defaultItems = new Map();
    defaultItems.set(this.data2[0], {
      selected: false,
      disabled: true,
    });

    this.defaultItems2 = defaultItems;
  }

  onSimpleSelectionChange(
    data: Map<TableDataInterface, SelectedItemStateInterface>
  ): void {
    const filtered = new Map();
    for (let entry of data) {
      if (entry[1].selected) {
        filtered.set(entry[0], entry[1]);
      }
    }
    this.selectedData = filtered;
  }
}
