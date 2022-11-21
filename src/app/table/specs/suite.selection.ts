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

  it(`when some items are selected then Check All should be partial. Case Multiple`, () => {
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
    expect(SCOPE.HTML_ELEMENTS['CHECK_ALL'].checked).toBeFalse();
    expect(SCOPE.HTML_ELEMENTS['CHECK_ALL'].indeterminate).toBeTrue();
  });

  it(`when all items are selected then Check All should be checked. Case Multiple`, () => {
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
          [THREE_ITEMS[1], { selected: true, disabled: false }],
          [THREE_ITEMS[2], { selected: true, disabled: false }],
        ])
      );
    });
    expect(SCOPE.HTML_ELEMENTS['CHECK_ALL'].checked).toBeTrue();
    expect(SCOPE.HTML_ELEMENTS['CHECK_ALL'].indeterminate).toBeFalse();
  });

  it(`when none items is checked then Check All should be unchecked. Case Multiple`, () => {
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
          [THREE_ITEMS[0], { selected: false, disabled: false }],
          [THREE_ITEMS[1], { selected: false, disabled: false }],
          [THREE_ITEMS[2], { selected: false, disabled: false }],
        ])
      );
    });
    expect(SCOPE.HTML_ELEMENTS['CHECK_ALL'].checked).toBeFalse();
    expect(SCOPE.HTML_ELEMENTS['CHECK_ALL'].indeterminate).toBeFalse();
  });

  it(`when uncheck one item from all checked items then Check All should be partial. Case Multiple`, () => {
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
          [THREE_ITEMS[1], { selected: true, disabled: false }],
          [THREE_ITEMS[2], { selected: true, disabled: false }],
        ])
      );
    });
    expect(SCOPE.HTML_ELEMENTS['CHECK_ALL'].checked).toBeTrue();
    expect(SCOPE.HTML_ELEMENTS['CHECK_ALL'].indeterminate).toBeFalse();

    const selectDebugElement = SCOPE.DEBUG_ELEMENTS['ROWS'][1].query(
      By.css('[type="checkbox"]')
    );
    const selectElement = selectDebugElement.nativeElement;
    selectElement.checked = false;
    selectDebugElement.triggerEventHandler('change', { target: selectElement });
    SCOPE.FIXTURE.detectChanges();

    expect(SCOPE.HTML_ELEMENTS['CHECK_ALL'].checked).toBeFalse();
    expect(SCOPE.HTML_ELEMENTS['CHECK_ALL'].indeterminate).toBeTrue();
  });

  it(`when some items checked and click on Check All then Check All and all items should be checked. Case Multiple`, () => {
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
          [THREE_ITEMS[1], { selected: false, disabled: false }],
          [THREE_ITEMS[2], { selected: true, disabled: false }],
        ])
      );
    });

    const checkAllElement = SCOPE.HTML_ELEMENTS['CHECK_ALL'];
    checkAllElement.checked = true;
    SCOPE.DEBUG_ELEMENTS['CHECK_ALL'].triggerEventHandler('change', {
      target: checkAllElement,
    });
    SCOPE.FIXTURE.detectChanges();
    expect(SCOPE.HTML_ELEMENTS['CHECK_ALL'].checked).toBeTrue();
    expect(SCOPE.HTML_ELEMENTS['CHECK_ALL'].indeterminate).toBeFalse();
    const items = SCOPE.COMPONENT.data.length;
    let selected = 0;
    Array.from(SCOPE.COMPONENT.selectedItems.values()).forEach((state: any) => {
      if (state.selected) {
        selected += 1;
      }
    });

    expect(selected).toBe(items);
  });

  it(`when none items checked by default and click on Check All then Check All and all items should be checked. Case Multiple`, () => {
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
          [THREE_ITEMS[0], { selected: false, disabled: false }],
          [THREE_ITEMS[1], { selected: false, disabled: false }],
          [THREE_ITEMS[2], { selected: false, disabled: false }],
        ])
      );
    });

    expect(SCOPE.HTML_ELEMENTS['CHECK_ALL'].checked).toBeFalse();
    expect(SCOPE.HTML_ELEMENTS['CHECK_ALL'].indeterminate).toBeFalse();

    const checkAllElement = SCOPE.HTML_ELEMENTS['CHECK_ALL'];
    checkAllElement.checked = true;
    SCOPE.DEBUG_ELEMENTS['CHECK_ALL'].triggerEventHandler('change', {
      target: checkAllElement,
    });
    SCOPE.FIXTURE.detectChanges();
    expect(SCOPE.HTML_ELEMENTS['CHECK_ALL'].checked).toBeTrue();
    expect(SCOPE.HTML_ELEMENTS['CHECK_ALL'].indeterminate).toBeFalse();
    const items = SCOPE.COMPONENT.data.length;
    let selected = 0;
    Array.from(SCOPE.COMPONENT.selectedItems.values()).forEach((state: any) => {
      if (state.selected) {
        selected += 1;
      }
    });

    expect(selected).toBe(items);
  });

  it(`when none items checked and click on Check All then Check All and all items should be checked. Case Multiple`, () => {
    INIT(SCOPE, () => {
      // @Input() config =
      SET_INPUT(SCOPE, 'config', {
        columns: [{ alias: 'id', label: 'ID' }],
        uniqIdKey: 'id',
        selection: TableActions.Multiple,
      });
      // @Input() data =
      SET_INPUT(SCOPE, 'data', THREE_ITEMS);
    });

    expect(SCOPE.HTML_ELEMENTS['CHECK_ALL'].checked).toBeFalse();
    expect(SCOPE.HTML_ELEMENTS['CHECK_ALL'].indeterminate).toBeFalse();

    const checkAllElement = SCOPE.HTML_ELEMENTS['CHECK_ALL'];
    checkAllElement.checked = true;
    SCOPE.DEBUG_ELEMENTS['CHECK_ALL'].triggerEventHandler('change', {
      target: checkAllElement,
    });
    SCOPE.FIXTURE.detectChanges();
    expect(SCOPE.HTML_ELEMENTS['CHECK_ALL'].checked).toBeTrue();
    expect(SCOPE.HTML_ELEMENTS['CHECK_ALL'].indeterminate).toBeFalse();
    const items = SCOPE.COMPONENT.data.length;
    let selected = 0;
    Array.from(SCOPE.COMPONENT.selectedItems.values()).forEach((state: any) => {
      if (state.selected) {
        selected += 1;
      }
    });

    expect(selected).toBe(items);
  });

  it(`when some items checked by default and click on Check All twice then Check All and all items should be unchecked. Case Multiple`, () => {
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
          [THREE_ITEMS[0], { selected: false, disabled: false }],
          [THREE_ITEMS[1], { selected: true, disabled: false }],
          [THREE_ITEMS[2], { selected: false, disabled: false }],
        ])
      );
    });

    expect(SCOPE.HTML_ELEMENTS['CHECK_ALL'].checked).toBeFalse();
    expect(SCOPE.HTML_ELEMENTS['CHECK_ALL'].indeterminate).toBeTrue();

    const checkAllElement = SCOPE.HTML_ELEMENTS['CHECK_ALL'];
    checkAllElement.checked = true;
    SCOPE.DEBUG_ELEMENTS['CHECK_ALL'].triggerEventHandler('change', {
      target: checkAllElement,
    });
    SCOPE.FIXTURE.detectChanges();
    expect(SCOPE.HTML_ELEMENTS['CHECK_ALL'].checked).toBeTrue();
    expect(SCOPE.HTML_ELEMENTS['CHECK_ALL'].indeterminate).toBeFalse();
    const items = SCOPE.COMPONENT.data.length;
    let selected = 0;
    Array.from(SCOPE.COMPONENT.selectedItems.values()).forEach((state: any) => {
      if (state.selected) {
        selected += 1;
      }
    });

    expect(selected).toBe(items);

    checkAllElement.checked = false;
    SCOPE.DEBUG_ELEMENTS['CHECK_ALL'].triggerEventHandler('change', {
      target: checkAllElement,
    });

    SCOPE.FIXTURE.detectChanges();

    selected = 0;

    let unselected = 0;

    Array.from(SCOPE.COMPONENT.selectedItems.values()).forEach((state: any) => {
      if (!state.selected) {
        unselected += 1;
      }
    });

    expect(unselected).toBe(3);
  });

  it(`when none items checked by default and click on Check All twice then Check All and all items should be unchecked. Case Multiple`, () => {
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
          [THREE_ITEMS[0], { selected: false, disabled: false }],
          [THREE_ITEMS[1], { selected: false, disabled: false }],
          [THREE_ITEMS[2], { selected: false, disabled: false }],
        ])
      );
    });

    const checkAllElement = SCOPE.HTML_ELEMENTS['CHECK_ALL'];
    const items = SCOPE.COMPONENT.data.length;
    let selected = 0;

    expect(SCOPE.HTML_ELEMENTS['CHECK_ALL'].checked).toBeFalse();
    expect(SCOPE.HTML_ELEMENTS['CHECK_ALL'].indeterminate).toBeFalse();

    checkAllElement.checked = true;
    SCOPE.DEBUG_ELEMENTS['CHECK_ALL'].triggerEventHandler('change', {
      target: checkAllElement,
    });

    SCOPE.FIXTURE.detectChanges();

    expect(SCOPE.HTML_ELEMENTS['CHECK_ALL'].checked).toBeTrue();
    expect(SCOPE.HTML_ELEMENTS['CHECK_ALL'].indeterminate).toBeFalse();

    Array.from(SCOPE.COMPONENT.selectedItems.values()).forEach((state: any) => {
      if (state.selected) {
        selected += 1;
      }
    });

    expect(selected).toBe(items);

    checkAllElement.checked = false;
    SCOPE.DEBUG_ELEMENTS['CHECK_ALL'].triggerEventHandler('change', {
      target: checkAllElement,
    });

    SCOPE.FIXTURE.detectChanges();

    expect(SCOPE.HTML_ELEMENTS['CHECK_ALL'].checked).toBeFalse();
    expect(SCOPE.HTML_ELEMENTS['CHECK_ALL'].indeterminate).toBeFalse();

    selected = 0;
    let unselected = 0;

    Array.from(SCOPE.COMPONENT.selectedItems.values()).forEach((state: any) => {
      if (!state.selected) {
        unselected += 1;
      }
    });

    expect(unselected).toBe(3);
  });

  it(`when none items checked and click on Check All twice then Check All and all items should be unchecked. Case Multiple`, () => {
    INIT(SCOPE, () => {
      // @Input() config =
      SET_INPUT(SCOPE, 'config', {
        columns: [{ alias: 'id', label: 'ID' }],
        uniqIdKey: 'id',
        selection: TableActions.Multiple,
      });
      // @Input() data =
      SET_INPUT(SCOPE, 'data', THREE_ITEMS);
    });

    const checkAllElement = SCOPE.HTML_ELEMENTS['CHECK_ALL'];
    const items = SCOPE.COMPONENT.data.length;
    let selected = 0;

    expect(SCOPE.HTML_ELEMENTS['CHECK_ALL'].checked).toBeFalse();
    expect(SCOPE.HTML_ELEMENTS['CHECK_ALL'].indeterminate).toBeFalse();

    checkAllElement.checked = true;
    SCOPE.DEBUG_ELEMENTS['CHECK_ALL'].triggerEventHandler('change', {
      target: checkAllElement,
    });

    SCOPE.FIXTURE.detectChanges();

    expect(SCOPE.HTML_ELEMENTS['CHECK_ALL'].checked).toBeTrue();
    expect(SCOPE.HTML_ELEMENTS['CHECK_ALL'].indeterminate).toBeFalse();

    Array.from(SCOPE.COMPONENT.selectedItems.values()).forEach((state: any) => {
      if (state.selected) {
        selected += 1;
      }
    });

    expect(selected).toBe(items);

    checkAllElement.checked = false;
    SCOPE.DEBUG_ELEMENTS['CHECK_ALL'].triggerEventHandler('change', {
      target: checkAllElement,
    });

    SCOPE.FIXTURE.detectChanges();

    expect(SCOPE.HTML_ELEMENTS['CHECK_ALL'].checked).toBeFalse();
    expect(SCOPE.HTML_ELEMENTS['CHECK_ALL'].indeterminate).toBeFalse();

    selected = 0;

    let unselected = 0;

    Array.from(SCOPE.COMPONENT.selectedItems.values()).forEach((state: any) => {
      if (!state.selected) {
        unselected += 1;
      }
    });

    expect(unselected).toBe(3);
  });

  it(`when item is disabled and click on Check All then items's state should not be changed. Case Multiple`, () => {
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
          [THREE_ITEMS[0], { selected: false, disabled: true }],
          [THREE_ITEMS[1], { selected: true, disabled: false }],
          [THREE_ITEMS[2], { selected: false, disabled: false }],
        ])
      );
    });

    const checkAllDegubElement = SCOPE.DEBUG_ELEMENTS['CHECK_ALL'];
    const checkAllElement = SCOPE.HTML_ELEMENTS['CHECK_ALL'];
    const disabledDebugElement = SCOPE.DEBUG_ELEMENTS['ROWS'][0].query(
      By.css('[type="checkbox"]:disabled')
    );
    const disabledElement = disabledDebugElement.nativeElement;

    expect(disabledDebugElement).not.toBeNull();
    expect(disabledElement).toBeDefined();
    expect(disabledElement.checked).toBeFalse();
    expect(disabledElement.disabled).toBeTrue();

    checkAllElement.checked = true;
    checkAllDegubElement.triggerEventHandler('change', {
      target: checkAllElement,
    });
    SCOPE.FIXTURE.detectChanges();

    expect(disabledElement.checked).toBeFalse();
    expect(disabledElement.disabled).toBeTrue();
  });

  it(`None selected and some disabled. Click on Check All. Case Multiple`, () => {
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
          [THREE_ITEMS[0], { selected: false, disabled: true }],
          [THREE_ITEMS[1], { selected: false, disabled: false }],
          [THREE_ITEMS[2], { selected: false, disabled: false }],
        ])
      );
    });

    const checkAllDegubElement = SCOPE.DEBUG_ELEMENTS['CHECK_ALL'];
    const checkAllElement = SCOPE.HTML_ELEMENTS['CHECK_ALL'];
    const disabledDebugElement = SCOPE.DEBUG_ELEMENTS['ROWS'][0].query(
      By.css('[type="checkbox"]:disabled')
    );
    const disabledElement = disabledDebugElement.nativeElement;

    expect(disabledDebugElement).not.toBeNull();
    expect(disabledElement).toBeDefined();
    expect(disabledElement.checked).toBeFalse();
    expect(disabledElement.disabled).toBeTrue();

    checkAllElement.checked = true;
    checkAllDegubElement.triggerEventHandler('change', {
      target: checkAllElement,
    });
    SCOPE.FIXTURE.detectChanges();

    expect(checkAllElement.indeterminate).toBeFalse();
    expect(disabledElement.checked).toBeFalse();
    expect(disabledElement.disabled).toBeTrue();
  });

  it(`None selected and some disabled. Click on Check All. Uncheck one. Click on Check All. Case Multiple`, () => {
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
          [THREE_ITEMS[0], { selected: false, disabled: false }],
          [THREE_ITEMS[1], { selected: false, disabled: false }],
          [THREE_ITEMS[2], { selected: false, disabled: true }],
        ])
      );
    });

    const checkAllDegubElement = SCOPE.DEBUG_ELEMENTS['CHECK_ALL'];
    const checkAllElement = SCOPE.HTML_ELEMENTS['CHECK_ALL'];
    const selecDebugElement = SCOPE.DEBUG_ELEMENTS['ROWS'][1].query(
      By.css('[type="checkbox"]')
    );
    const seleletElement = selecDebugElement.nativeElement;
    let selected = 0;

    let unselected = 0;

    Array.from(SCOPE.COMPONENT.selectedItems.values()).forEach((state: any) => {
      if (!state.selected) {
        unselected += 1;
      }
    });
    expect(
      SCOPE.DEBUG_ELEMENTS['ROOT'].queryAll(By.css('tbody input:checked'))
        .length
    ).toBe(0);
    expect(unselected).toBe(3);

    // click on check all
    selected = 0;
    checkAllElement.checked = true;
    checkAllDegubElement.triggerEventHandler('change', {
      target: checkAllElement,
    });
    SCOPE.FIXTURE.detectChanges();

    Array.from(SCOPE.COMPONENT.selectedItems.values()).forEach((state: any) => {
      if (state.selected) {
        selected += 1;
      }
    });

    expect(
      SCOPE.DEBUG_ELEMENTS['ROOT'].queryAll(By.css('tbody input:checked'))
        .length
    ).toBe(2);
    expect(selected).toBe(2);

    // uncheck one
    selected = 0;
    seleletElement.checked = false;
    selecDebugElement.triggerEventHandler('change', { target: seleletElement });
    SCOPE.FIXTURE.detectChanges();

    Array.from(SCOPE.COMPONENT.selectedItems.values()).forEach((state: any) => {
      if (state.selected) {
        selected += 1;
      }
    });

    expect(
      SCOPE.DEBUG_ELEMENTS['ROOT'].queryAll(By.css('tbody input:checked'))
        .length
    ).toBe(1);
    expect(selected).toBe(1);

    // click on check all
    selected = 0;
    checkAllElement.checked = true;
    checkAllDegubElement.triggerEventHandler('change', {
      target: checkAllElement,
    });
    SCOPE.FIXTURE.detectChanges();

    Array.from(SCOPE.COMPONENT.selectedItems.values()).forEach((state: any) => {
      if (state.selected) {
        selected += 1;
      }
    });
    expect(
      SCOPE.DEBUG_ELEMENTS['ROOT'].queryAll(By.css('tbody input:checked'))
        .length
    ).toBe(2);
    expect(selected).toBe(2);
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
