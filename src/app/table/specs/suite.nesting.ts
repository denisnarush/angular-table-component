import { By } from '@angular/platform-browser';

import { INIT, BEFORE_EACH, SET_INPUT, REINIT_ELEMENTS } from './helpers';

import { ONE_ITEM } from './mock.data';

export const NestingDescribe = () => {
  let SCOPE: any = {};

  beforeEach(async () => {
    await BEFORE_EACH(SCOPE);
  });

  it(`should not have additional colum for nesting action when nesting not provided`, () => {
    INIT(SCOPE, () => {
      // @Input() config =
      SET_INPUT(SCOPE, 'config', {
        columns: [{ alias: 'id', label: 'ID' }],
        uniqIdKey: 'id',
      });
      // @Input() data =
      SET_INPUT(SCOPE, 'data', [ONE_ITEM]);
    });
    expect(
      SCOPE.HTML_ELEMENTS['ROOT'].querySelectorAll('thead tr th').length
    ).toBe(1);
  });

  it(`should display nesting action column in the row`, () => {
    INIT(SCOPE, () => {
      // @Input() config =
      SET_INPUT(SCOPE, 'config', {
        columns: [{ alias: 'id', label: 'ID' }],
        uniqIdKey: 'id',
        nesting: true,
      });
      // @Input() data =
      SET_INPUT(SCOPE, 'data', [ONE_ITEM]);
    });

    expect(
      SCOPE.DEBUG_ELEMENTS['ROWS'][0].nativeElement.querySelectorAll('td')
        .length
    ).toBe(2);
  });

  it(`should toogle nested view`, () => {
    INIT(SCOPE, () => {
      // @Input() config =
      SET_INPUT(SCOPE, 'config', {
        columns: [{ alias: 'id', label: 'ID' }],
        uniqIdKey: 'id',
        nesting: true,
      });
      // @Input() data =
      SET_INPUT(SCOPE, 'data', [ONE_ITEM]);
    });

    const toggleDebugElement = SCOPE.DEBUG_ELEMENTS['ROWS'][0].query(
      By.css('[data-e2e="nesting-toggle"]')
    );
    const toggle = toggleDebugElement.nativeElement;

    expect(toggleDebugElement).not.toBeNull();
    expect(toggle).toBeDefined();
    expect(SCOPE.DEBUG_ELEMENTS['NESTING_VIEWS'][0]).toBeUndefined();

    toggleDebugElement.triggerEventHandler('click');
    SCOPE.FIXTURE.detectChanges();
    REINIT_ELEMENTS(SCOPE);

    expect(SCOPE.DEBUG_ELEMENTS['NESTING_VIEWS'][0]).toBeDefined();
    expect(SCOPE.DEBUG_ELEMENTS['NESTING_VIEWS'][0]).not.toBeNull();
    expect(SCOPE.DEBUG_ELEMENTS['NESTING_VIEWS'][0].nativeElement.tagName).toBe(
      'TR'
    );
    expect(
      SCOPE.DEBUG_ELEMENTS['NESTING_VIEWS'][0].nativeElement.children[0].tagName
    ).toBe('TD');
    expect(
      SCOPE.DEBUG_ELEMENTS[
        'NESTING_VIEWS'
      ][0].nativeElement.children[0].getAttribute('colspan')
    ).toBe('2');
  });
};
