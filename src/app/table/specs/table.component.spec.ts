import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './../table.component';
import { GetMapValueByKeyPipe, GetValueByPathPipe } from './../table.pipes';

import { SelectionDescribe } from './suite.selection';
import { SortingSuite } from './suite.sorting';
import { GeneralDescribe } from './suite.general';

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
describe('TableComponent/sorting', SortingSuite);
