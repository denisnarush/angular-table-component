import { Component } from '@angular/core';
import { combineLatest, map, startWith } from 'rxjs';
import { NestedConfig } from './nested.config';
import { SimpleConfig } from './simple.config';
import {
  SelectedItemStateInterface,
  TableActions,
  TableColumnInterface,
  TableConfigSortingColumnInterface,
  TableConfigSortingOrders,
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

  TableActions = TableActions;

  selectedData!: TableDataInterface[];
  orderValue: TableConfigSortingColumnInterface[] = [
    { alias: 'name', order: TableConfigSortingOrders.Asc },
  ];
  defaultItems: Map<TableDataInterface, SelectedItemStateInterface> = new Map();

  vm$ = combineLatest([this.usersService.getUsers()]).pipe(
    startWith([null]),
    map(([users]) => ({ users }))
  );

  isSortingDropdownActive = false;

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

  onSelectTypeChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;

    if (value === TableActions.Multiple)
      this.simpleConfig.selection = TableActions.Multiple;
    if (value === TableActions.Single)
      this.simpleConfig.selection = TableActions.Single;

    if (value === 'null') delete this.simpleConfig.selection;

    this.simpleConfig = { ...this.simpleConfig };
  }

  onNestingTypeChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;

    if (value === 'ON') this.simpleConfig.nesting = true;
    if (value === 'OFF') this.simpleConfig.nesting = false;

    this.simpleConfig = { ...this.simpleConfig };
  }

  onSortingChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    const checked = (event.target as HTMLInputElement).checked;

    if (!checked && this.simpleConfig.sorting) {
      this.simpleConfig.sorting.columns =
        this.simpleConfig.sorting?.columns.filter(
          (column) => column.alias !== value
        );
    }
    if (checked && this.simpleConfig.sorting) {
      this.simpleConfig.sorting.columns.push({
        alias: value,
        order: null,
      });
    }

    this.simpleConfig = { ...this.simpleConfig };
  }

  onSortingDropdownToggle(): void {
    this.isSortingDropdownActive = !this.isSortingDropdownActive;
  }
}
