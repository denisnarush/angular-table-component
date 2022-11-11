import { Component, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {
  simpleConfig = SimpleConfig;
  NestedConfig = NestedConfig;

  selectedData!: { [K: string]: SelectedItemStateInterface };
  defaultItems: Map<TableDataInterface, SelectedItemStateInterface> = new Map();

  vm$ = combineLatest([this.usersService.getUsers()]).pipe(
    startWith([null]),
    map(([users]) => ({ users }))
  );

  constructor(private usersService: UserService) {}

  ngOnInit(): void {}

  onSimpleSelectionChange(data: {
    [K: string]: SelectedItemStateInterface;
  }): void {
    this.selectedData = data;
  }
}
