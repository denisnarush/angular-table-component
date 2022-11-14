import { Component } from '@angular/core';
import { combineLatest, map, startWith } from 'rxjs';
import { NestedConfig } from './nested.config';
import { SimpleConfig } from './simple.config';
import {
  SelectedItemStateInterface,
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
  defaultItems: Map<TableDataInterface, SelectedItemStateInterface> = new Map();

  vm$ = combineLatest([this.usersService.getUsers()]).pipe(
    startWith([null]),
    map(([users]) => ({ users }))
  );

  constructor(private usersService: UserService) {}

  onSimpleSelectionChange(
    data: Map<TableDataInterface, SelectedItemStateInterface>
  ): void {
    const newArra = [];
    for (const [item, state] of data) {
      if (state.selected) {
        newArra.push(item);
      }
    }
    this.selectedData = newArra;
  }
}
