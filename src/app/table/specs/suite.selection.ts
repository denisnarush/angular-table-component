import { TableActions } from '../table.interface';

import { INIT, BEFORE_EACH, SET_INPUT } from './helpers';

import { ONE_ITEM, THREE_ITEMS } from './mock';

export const SelectionDescribe = () => {
  let SCOPE: any = {};

  beforeEach(async () => {
    await BEFORE_EACH(SCOPE);
  });

  it(`should display column for 'check all'`, () => {
    INIT(SCOPE, () => {
      // @Input() config =
      SET_INPUT(SCOPE, 'config', {
        columns: [{ alias: 'id', label: 'ID' }],
        uniqIdKey: 'id',
        selection: TableActions.Multiple,
      });
      // @Input() data =
      SET_INPUT(SCOPE, 'data', [ONE_ITEM]);
    });
    expect(
      SCOPE.HTML_ELEMENTS['ROOT'].querySelectorAll('thead tr th').length
    ).toBe(2);
    expect(
      SCOPE.DEBUG_ELEMENTS['ROWS'][0].nativeElement.querySelectorAll('td')
        .length
    ).toBe(2);
    expect(SCOPE.DEBUG_ELEMENTS['CHECK_ALL']).toBeDefined();
    expect(SCOPE.HTML_ELEMENTS['CHECK_ALL']).toBeDefined();
  });

  it(`should not display check all if selection not provided`, () => {
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
    expect(SCOPE.DEBUG_ELEMENTS['CHECK_ALL']).toBeNull();
    expect(SCOPE.HTML_ELEMENTS['CHECK_ALL']).toBeUndefined();
  });

  it(`should pre set values for selection. case Single.`, () => {
    INIT(SCOPE, () => {
      // @Input() config =
      SET_INPUT(SCOPE, 'config', {
        columns: [{ alias: 'id', label: 'ID' }],
        uniqIdKey: 'id',
        selection: TableActions.Single,
      });
      // @Input() data =
      SET_INPUT(SCOPE, 'data', THREE_ITEMS);
      // @Input() defaultItems =
      SET_INPUT(
        SCOPE,
        'defaultItems',
        new Map([[THREE_ITEMS[1], { selected: true, disabled: false }]])
      );
    });

    expect(SCOPE.DEBUG_ELEMENTS['ROWS'].length).toBe(3);
    expect(
      SCOPE.DEBUG_ELEMENTS['ROWS'][0].nativeElement.querySelector(
        'input[type=radio]'
      )
    ).toBeDefined();
    expect(
      SCOPE.DEBUG_ELEMENTS['ROWS'][0].nativeElement.querySelector(
        'input[type=radio]'
      ).checked
    ).toBeFalse();
    expect(
      SCOPE.DEBUG_ELEMENTS['ROWS'][1].nativeElement.querySelector(
        'input[type=radio]'
      )
    ).toBeDefined();
    expect(
      SCOPE.DEBUG_ELEMENTS['ROWS'][1].nativeElement.querySelector(
        'input[type=radio]'
      ).checked
    ).toBeTrue();
  });

  it(`should pre set values for selection. case Multiple`, () => {
    INIT(SCOPE, () => {
      // @Input() config =
      SET_INPUT(SCOPE, 'config', {
        columns: [{ alias: 'id', label: 'ID' }],
        uniqIdKey: 'id',
        selection: TableActions.Multiple,
      });
      // @Input() data =
      SET_INPUT(SCOPE, 'data', THREE_ITEMS);
      // @Input() defaultItems =
      SET_INPUT(
        SCOPE,
        'defaultItems',
        new Map([
          [THREE_ITEMS[0], { selected: true, disabled: false }],
          [THREE_ITEMS[2], { selected: true, disabled: false }],
        ])
      );
    });

    expect(SCOPE.DEBUG_ELEMENTS['ROWS'].length).toBe(3);
    expect(
      SCOPE.DEBUG_ELEMENTS['ROWS'][0].nativeElement.querySelector(
        'input[type=checkbox]'
      )
    ).toBeDefined();
    expect(
      SCOPE.DEBUG_ELEMENTS['ROWS'][1].nativeElement.querySelector(
        'input[type=checkbox]'
      )
    ).toBeDefined();
    expect(
      SCOPE.DEBUG_ELEMENTS['ROWS'][2].nativeElement.querySelector(
        'input[type=checkbox]'
      )
    ).toBeDefined();
    expect(
      SCOPE.DEBUG_ELEMENTS['ROWS'][0].nativeElement.querySelector(
        'input[type=checkbox]'
      ).checked
    ).toBeTrue();
    expect(
      SCOPE.DEBUG_ELEMENTS['ROWS'][1].nativeElement.querySelector(
        'input[type=checkbox]'
      ).checked
    ).toBeFalse();
    expect(
      SCOPE.DEBUG_ELEMENTS['ROWS'][2].nativeElement.querySelector(
        'input[type=checkbox]'
      ).checked
    ).toBeTrue();
  });
};
