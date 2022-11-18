import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { TableComponent } from '../table.component';
import { GetMapValueByKeyPipe, GetValueByPathPipe } from '../table.pipes';
import { CheckAllStatusDirective } from '../table.directives';

export interface ScopeInterface {
  FIXTURE: ComponentFixture<TableComponent>;
  COMPONENT: TableComponent;
  DEBUG_ELEMENTS: {
    [K: string]: DebugElement | DebugElement[] | undefined;
    ROWS?: DebugElement[];
  };
  HTML_ELEMENTS: {
    [K: string]: HTMLElement;
  };
}

export const RECREATE = (SCOPE: ScopeInterface) => {
  SCOPE.FIXTURE = TestBed.createComponent(TableComponent);
  SCOPE.COMPONENT = SCOPE.FIXTURE.componentInstance;
};

export const REINIT_ELEMENTS = (SCOPE: ScopeInterface) => {
  SCOPE.DEBUG_ELEMENTS['ROOT'] = SCOPE.FIXTURE.debugElement.query(
    By.css('.table-container')
  );
  SCOPE.HTML_ELEMENTS['ROOT'] = SCOPE.DEBUG_ELEMENTS['ROOT']?.nativeElement;
  SCOPE.DEBUG_ELEMENTS['HEADER'] = SCOPE.FIXTURE.debugElement.query(
    By.css('thead')
  );
  SCOPE.HTML_ELEMENTS['HEADER'] = SCOPE.DEBUG_ELEMENTS['HEADER']?.nativeElement;
  SCOPE.DEBUG_ELEMENTS['NO_CONFIG'] = SCOPE.FIXTURE.debugElement.query(
    By.css('[data-e2e="no-config')
  );
  SCOPE.HTML_ELEMENTS['NO_CONFIG'] =
    SCOPE.DEBUG_ELEMENTS['NO_CONFIG']?.nativeElement;
  SCOPE.DEBUG_ELEMENTS['NO_DATA'] = SCOPE.FIXTURE.debugElement.query(
    By.css('[data-e2e="no-data')
  );
  SCOPE.HTML_ELEMENTS['NO_DATA'] =
    SCOPE.DEBUG_ELEMENTS['NO_DATA']?.nativeElement;
  SCOPE.DEBUG_ELEMENTS['EMPTY_DATA'] = SCOPE.FIXTURE.debugElement.query(
    By.css('[data-e2e="empty-data')
  );
  SCOPE.HTML_ELEMENTS['EMPTY_DATA'] =
    SCOPE.DEBUG_ELEMENTS['EMPTY_DATA']?.nativeElement;
  SCOPE.DEBUG_ELEMENTS['CHECK_ALL'] = SCOPE.FIXTURE.debugElement.query(
    By.css('[data-e2e="check-all"]')
  );
  SCOPE.HTML_ELEMENTS['CHECK_ALL'] =
    SCOPE.DEBUG_ELEMENTS['CHECK_ALL']?.nativeElement;
  SCOPE.DEBUG_ELEMENTS['ROWS'] = SCOPE.FIXTURE.debugElement.queryAll(
    By.css('[data-e2e="data-row')
  );
};

export const BEFORE_EACH = async (SCOPE: ScopeInterface) => {
  await TestBed.configureTestingModule({
    declarations: [
      TableComponent,
      GetValueByPathPipe,
      GetMapValueByKeyPipe,
      CheckAllStatusDirective,
    ],
  }).compileComponents();

  SCOPE.DEBUG_ELEMENTS = {};
  SCOPE.HTML_ELEMENTS = {};

  RECREATE(SCOPE);
  SCOPE.FIXTURE.detectChanges();
};

export const SET_INPUT = (
  SCOPE: ScopeInterface,
  name: string,
  value: unknown
) => {
  SCOPE.FIXTURE.componentRef.setInput(name, value);
};

export const INIT = (SCOPE: ScopeInterface, beforeOnInit = () => {}) => {
  RECREATE(SCOPE);
  beforeOnInit();
  SCOPE.FIXTURE.detectChanges();
  REINIT_ELEMENTS(SCOPE);
};
