import { Component } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  finalize,
  map,
  startWith,
  switchMap,
} from 'rxjs';
import { SimpleConfig, NestedConfig } from './table.config';
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
  isSortingDropdownActive = false;

  currentPage$ = new BehaviorSubject(1);
  isLoading$ = new BehaviorSubject(false);
  isDisabled$ = new BehaviorSubject(false);

  vm$ = combineLatest([
    this.currentPage$,
    this.isLoading$,
    this.isDisabled$,
    this.currentPage$
      .pipe(
        switchMap((page) => {
          this.isLoading$.next(true);
          return this.usersService.getUsers({ page }).pipe(
            finalize(() => {
              this.isLoading$.next(false);
            })
          );
        })
      )
      .pipe(startWith(null)),
  ]).pipe(
    map(([currentPage, isLoading, isDisabled, users]) => ({
      currentPage,
      isLoading,
      isDisabled,
      users,
    }))
  );

  constructor(private usersService: UserService) {
    this.defaultItems = new Map([
      [usersService.getData()[1], { selected: true, disabled: false }],
      [usersService.getData()[3], { selected: false, disabled: true }],
    ]);
  }

  onIsLoading(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.isLoading$.next(target.checked);
  }

  onIsDisabled(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.isDisabled$.next(target.checked);
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

  onPage(page: number): void {
    this.currentPage$.next(page);
  }
}
