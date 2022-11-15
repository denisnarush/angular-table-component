import { By } from '@angular/platform-browser';
import { TableActions } from '../table.interface';

import { INIT, BEFORE_EACH, SET_INPUT } from './helpers';

import { ONE_ITEM, THREE_ITEMS, TWO_ITEMS } from './mock';

export const SelectionDescribe = () => {
  let SCOPE: any = {};

  beforeEach(async () => {
    await BEFORE_EACH(SCOPE);
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

  it(`should display column for 'check all'. case Multiple`, () => {
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

  it(`selected items have to be equal to default items on init. case Multiple`, () => {
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

    expect(SCOPE.COMPONENT.selectedItems.size).toBe(2);
    expect(SCOPE.COMPONENT.selectedItems.has(THREE_ITEMS[0])).toBeTrue();
    expect(SCOPE.COMPONENT.selectedItems.has(THREE_ITEMS[2])).toBeTrue();
    expect(
      SCOPE.COMPONENT.selectedItems.get(THREE_ITEMS[0]).selected
    ).toBeTrue();
    expect(
      SCOPE.COMPONENT.selectedItems.get(THREE_ITEMS[2]).selected
    ).toBeTrue();
  });

  it(`should select a value. case Multiple`, () => {
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

    const rowDebug = SCOPE.DEBUG_ELEMENTS['ROWS'][0];
    const inputDebug = rowDebug.query(By.css('input'));
    const inputHtml = inputDebug.nativeElement;

    expect(SCOPE.COMPONENT.selectedItems.size).toBe(0);
    expect(inputHtml.checked).toBeFalse();

    inputHtml.checked = true;
    inputDebug.triggerEventHandler('change', { target: inputHtml });

    SCOPE.FIXTURE.detectChanges();

    expect(SCOPE.COMPONENT.selectedItems.size).toBe(1);
    expect(SCOPE.COMPONENT.selectedItems.get(ONE_ITEM).selected).toBeTrue();
    expect(SCOPE.COMPONENT.selectedItems.get(ONE_ITEM).disabled).toBeFalse();
  });

  it(`should't set lastValue on selection. case Multiple`, () => {
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

    expect(SCOPE.COMPONENT.lastSelectedRow).toBeUndefined();

    const rowDebug = SCOPE.DEBUG_ELEMENTS['ROWS'][0];
    const inputDebug = rowDebug.query(By.css('input'));
    const inputHtml = inputDebug.nativeElement;

    inputHtml.checked = true;
    inputDebug.triggerEventHandler('change', { target: inputHtml });

    SCOPE.FIXTURE.detectChanges();

    expect(SCOPE.COMPONENT.lastSelectedRow).toBeUndefined();
  });

  it(`should't set/change lastValue on selection. case Multiple`, () => {
    INIT(SCOPE, () => {
      // @Input() config =
      SET_INPUT(SCOPE, 'config', {
        columns: [{ alias: 'id', label: 'ID' }],
        uniqIdKey: 'id',
        selection: TableActions.Multiple,
      });
      // @Input() data =
      SET_INPUT(SCOPE, 'data', TWO_ITEMS);
    });

    expect(SCOPE.COMPONENT.selectedItems.size).toBe(0);
    expect(SCOPE.COMPONENT.lastSelectedRow).toBeUndefined();

    const rowDebug = SCOPE.DEBUG_ELEMENTS['ROWS'][0];
    const inputDebug = rowDebug.query(By.css('input'));
    const inputHtml = inputDebug.nativeElement;

    inputHtml.checked = true;
    inputDebug.triggerEventHandler('change', { target: inputHtml });

    SCOPE.FIXTURE.detectChanges();

    expect(SCOPE.COMPONENT.selectedItems.size).toBe(1);
    expect(SCOPE.COMPONENT.lastSelectedRow).toBeUndefined();

    const nextRowDebug = SCOPE.DEBUG_ELEMENTS['ROWS'][1];
    const nextInputDebug = nextRowDebug.query(By.css('input'));
    const nextInputHtml = nextInputDebug.nativeElement;

    nextInputHtml.checked = true;
    nextInputDebug.triggerEventHandler('change', { target: nextInputHtml });
    SCOPE.FIXTURE.detectChanges();

    expect(SCOPE.COMPONENT.selectedItems.size).toBe(2);
    expect(SCOPE.COMPONENT.lastSelectedRow).toBeUndefined();
  });

  it(`selected items size should be N-selected items on selection. case Multiple`, () => {
    INIT(SCOPE, () => {
      // @Input() config =
      SET_INPUT(SCOPE, 'config', {
        columns: [{ alias: 'id', label: 'ID' }],
        uniqIdKey: 'id',
        selection: TableActions.Multiple,
      });
      // @Input() data =
      SET_INPUT(SCOPE, 'data', TWO_ITEMS);
    });

    expect(SCOPE.COMPONENT.selectedItems.size).toBe(0);

    const rowDebug = SCOPE.DEBUG_ELEMENTS['ROWS'][0];
    const inputDebug = rowDebug.query(By.css('input'));
    const inputHtml = inputDebug.nativeElement;

    inputHtml.checked = true;
    inputDebug.triggerEventHandler('change', { target: inputHtml });

    SCOPE.FIXTURE.detectChanges();

    expect(SCOPE.COMPONENT.selectedItems.size).toBe(1);

    const nextRowDebug = SCOPE.DEBUG_ELEMENTS['ROWS'][1];
    const nextInputDebug = nextRowDebug.query(By.css('input'));
    const nextInputHtml = nextInputDebug.nativeElement;

    nextInputHtml.checked = true;
    nextInputDebug.triggerEventHandler('change', { target: nextInputHtml });
    SCOPE.FIXTURE.detectChanges();

    expect(SCOPE.COMPONENT.selectedItems.size).toBe(2);
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

  it(`should select a value. case Single`, () => {
    INIT(SCOPE, () => {
      // @Input() config =
      SET_INPUT(SCOPE, 'config', {
        columns: [{ alias: 'id', label: 'ID' }],
        uniqIdKey: 'id',
        selection: TableActions.Single,
      });
      // @Input() data =
      SET_INPUT(SCOPE, 'data', [ONE_ITEM]);
    });

    const rowDebug = SCOPE.DEBUG_ELEMENTS['ROWS'][0];
    const inputDebug = rowDebug.query(By.css('input'));
    const inputHtml = inputDebug.nativeElement;

    expect(SCOPE.COMPONENT.selectedItems.size).toBe(0);
    expect(inputHtml.checked).toBeFalse();

    inputHtml.checked = true;
    inputDebug.triggerEventHandler('change', { target: inputHtml });

    SCOPE.FIXTURE.detectChanges();

    expect(SCOPE.COMPONENT.selectedItems.size).toBe(1);
    expect(SCOPE.COMPONENT.selectedItems.get(ONE_ITEM).selected).toBeTrue();
    expect(SCOPE.COMPONENT.selectedItems.get(ONE_ITEM).disabled).toBeFalse();
  });

  it(`should set lastValue on selection. case Single`, () => {
    INIT(SCOPE, () => {
      // @Input() config =
      SET_INPUT(SCOPE, 'config', {
        columns: [{ alias: 'id', label: 'ID' }],
        uniqIdKey: 'id',
        selection: TableActions.Single,
      });
      // @Input() data =
      SET_INPUT(SCOPE, 'data', [ONE_ITEM]);
    });

    expect(SCOPE.COMPONENT.lastSelectedRow).toBeUndefined();

    const rowDebug = SCOPE.DEBUG_ELEMENTS['ROWS'][0];
    const inputDebug = rowDebug.query(By.css('input'));
    const inputHtml = inputDebug.nativeElement;

    inputHtml.checked = true;
    inputDebug.triggerEventHandler('change', { target: inputHtml });

    SCOPE.FIXTURE.detectChanges();

    expect(SCOPE.COMPONENT.lastSelectedRow).toBeDefined();
    expect(SCOPE.COMPONENT.lastSelectedRow).toBe(ONE_ITEM);
  });

  it(`should change lastValue on selection. case Single`, () => {
    INIT(SCOPE, () => {
      // @Input() config =
      SET_INPUT(SCOPE, 'config', {
        columns: [{ alias: 'id', label: 'ID' }],
        uniqIdKey: 'id',
        selection: TableActions.Single,
      });
      // @Input() data =
      SET_INPUT(SCOPE, 'data', TWO_ITEMS);
    });

    expect(SCOPE.COMPONENT.selectedItems.size).toBe(0);
    expect(SCOPE.COMPONENT.lastSelectedRow).toBeUndefined();

    const rowDebug = SCOPE.DEBUG_ELEMENTS['ROWS'][0];
    const inputDebug = rowDebug.query(By.css('input'));
    const inputHtml = inputDebug.nativeElement;

    inputHtml.checked = true;
    inputDebug.triggerEventHandler('change', { target: inputHtml });

    SCOPE.FIXTURE.detectChanges();

    expect(SCOPE.COMPONENT.selectedItems.size).toBe(1);
    expect(SCOPE.COMPONENT.lastSelectedRow).toBeDefined();
    expect(SCOPE.COMPONENT.lastSelectedRow).toBe(TWO_ITEMS[0]);

    const nextRowDebug = SCOPE.DEBUG_ELEMENTS['ROWS'][1];
    const nextInputDebug = nextRowDebug.query(By.css('input'));
    const nextInputHtml = nextInputDebug.nativeElement;

    nextInputHtml.checked = true;
    nextInputDebug.triggerEventHandler('change', { target: nextInputHtml });
    SCOPE.FIXTURE.detectChanges();

    expect(SCOPE.COMPONENT.selectedItems.size).toBe(1);
    expect(SCOPE.COMPONENT.lastSelectedRow).toBeDefined();
    expect(SCOPE.COMPONENT.lastSelectedRow).toBe(TWO_ITEMS[1]);
  });

  it(`selected items size should be 1 on selection. case Single`, () => {
    INIT(SCOPE, () => {
      // @Input() config =
      SET_INPUT(SCOPE, 'config', {
        columns: [{ alias: 'id', label: 'ID' }],
        uniqIdKey: 'id',
        selection: TableActions.Single,
      });
      // @Input() data =
      SET_INPUT(SCOPE, 'data', TWO_ITEMS);
    });

    expect(SCOPE.COMPONENT.selectedItems.size).toBe(0);

    const rowDebug = SCOPE.DEBUG_ELEMENTS['ROWS'][0];
    const inputDebug = rowDebug.query(By.css('input'));
    const inputHtml = inputDebug.nativeElement;

    inputHtml.checked = true;
    inputDebug.triggerEventHandler('change', { target: inputHtml });

    SCOPE.FIXTURE.detectChanges();

    expect(SCOPE.COMPONENT.selectedItems.size).toBe(1);

    const nextRowDebug = SCOPE.DEBUG_ELEMENTS['ROWS'][1];
    const nextInputDebug = nextRowDebug.query(By.css('input'));
    const nextInputHtml = nextInputDebug.nativeElement;

    nextInputHtml.checked = true;
    nextInputDebug.triggerEventHandler('change', { target: nextInputHtml });
    SCOPE.FIXTURE.detectChanges();

    expect(SCOPE.COMPONENT.selectedItems.size).toBe(1);
  });
};
