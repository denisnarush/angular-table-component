import { Component } from '@angular/core';
import { combineLatest, map, startWith } from 'rxjs';
import { NestedConfig } from './nested.config';
import { SimpleConfig } from './simple.config';
import {
  SelectedItemStateInterface,
  TableColumnInterface,
  TableConfigSortingColumnInterface,
  TableDataInterface,
} from './table/table.interface';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  simpleConfig = SimpleConfig;
  NestedConfig = NestedConfig;

  selectedData!: TableDataInterface[];
  orderValue!: TableConfigSortingColumnInterface[];
  defaultItems: Map<TableDataInterface, SelectedItemStateInterface> = new Map();

  vm$ = combineLatest([this.usersService.getUsers()]).pipe(
    startWith([null]),
    map(([users]) => ({ users }))
  );

  constructor(private usersService: UserService) {
    this.defaultItems = new Map([
      [usersService.getData()[1], { selected: true, disabled: false }],
      [usersService.getData()[3], { selected: false, disabled: true }],
    ]);
  }

  onSimpleSelectionChange(
    data: Map<TableDataInterface, SelectedItemStateInterface>
  ): void {
    const newArra: TableDataInterface[] = [];
    data.forEach((state, item) => {
      if (state.selected) {
        newArra.push(item);
      }
    });
    this.selectedData = newArra;
  }

  onSimpleSortChange(
    data: Map<TableColumnInterface, TableConfigSortingColumnInterface>
  ): void {
    this.orderValue = Array.from(data.values());
  }
}
