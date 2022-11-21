import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './../table.component';
import { GetMapValueByKeyPipe, GetValueByPathPipe } from './../table.pipes';

import { SelectionDescribe } from './suite.selection';
import { SortingDescribe } from './suite.sorting';
import { GeneralDescribe } from './suite.general';
import { NestingDescribe } from './suite.nesting';

describe('TableComponent/general', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent, GetValueByPathPipe, GetMapValueByKeyPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('TableComponent/general', GeneralDescribe);
describe('TableComponent/selection', SelectionDescribe);
describe('TableComponent/sorting', SortingDescribe);
describe('TableComponent/nesting', NestingDescribe);
