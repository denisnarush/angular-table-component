import { Component, OnInit } from '@angular/core';
import { data } from './mock.data';
import { NestedConfig } from './nested.config';
import { SimpleConfig } from './simple.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  SimpleConfig = SimpleConfig;
  NestedConfig = NestedConfig;
  data = data;

  constructor() {}

  ngOnInit(): void {}

  getDetails(item: any) {
    return this.data
      .filter((index) => index.id === item.id)
      .map((index) => index.friends)[0];
  }
}
