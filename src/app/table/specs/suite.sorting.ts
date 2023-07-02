import { By } from '@angular/platform-browser';
import {
  TableActions,
  TableConfigInterface,
  TableConfigSortingOrders,
} from '../table.interface';
import { BEFORE_EACH, INIT, SET_INPUT, ScopeInterface } from './helpers';
import { THREE_ITEMS } from './mock.data';

export const SortingDescribe = () => {
  let SCOPE: ScopeInterface = Object.assign({});

  beforeEach(async () => {
    await BEFORE_EACH(SCOPE);
  });

  it(`should have sorting element in header. case Multiple`, () => {
    INIT(SCOPE, () => {
      // @Input() config =
      SET_INPUT(SCOPE, 'config', {
        columns: [
          { alias: 'id', label: 'ID' },
          { alias: '-', label: '-' },
        ],
        sorting: {
          type: TableActions.Multiple,
          columns: [{ alias: 'id', order: null }],
        },
        uniqIdKey: 'id',
      } as TableConfigInterface);
      // @Input() data =
      SET_INPUT(SCOPE, 'data', THREE_ITEMS);
    });

    const sortableDebugElements = SCOPE.DEBUG_ELEMENTS['HEADER']?.queryAll(
      By.css('[data-e2e="label sortable"]')
    );

    const allDebugElements = SCOPE.DEBUG_ELEMENTS['HEADER']?.queryAll(
      By.css('[data-e2e^="label"]')
    );

    expect(sortableDebugElements).toBeDefined();
    expect(sortableDebugElements?.length).toBe(1);
    expect(allDebugElements).toBeDefined();
    expect(allDebugElements?.length).toBe(2);
  });

  it(`should have sorting elements in header. case Multiple`, () => {
    INIT(SCOPE, () => {
      // @Input() config =
      SET_INPUT(SCOPE, 'config', {
        columns: [
          { alias: 'id', label: 'ID' },
          { alias: 'name', label: 'Name' },
        ],
        sorting: {
          type: TableActions.Multiple,
          columns: [
            { alias: 'id', order: null },
            { alias: 'name', order: null },
          ],
        },
        uniqIdKey: 'id',
      } as TableConfigInterface);
      // @Input() data =
      SET_INPUT(SCOPE, 'data', THREE_ITEMS);
    });

    const sortableDebugElements = SCOPE.DEBUG_ELEMENTS['HEADER']?.queryAll(
      By.css('[data-e2e="label sortable"]')
    );

    const allDebugElements = SCOPE.DEBUG_ELEMENTS['HEADER']?.queryAll(
      By.css('[data-e2e^="label"]')
    );

    expect(sortableDebugElements).toBeDefined();
    expect(sortableDebugElements?.length).toBe(2);
    expect(allDebugElements).toBeDefined();
    expect(allDebugElements?.length).toBe(2);
  });

  it(`should have sorting element in header. case Single`, () => {
    INIT(SCOPE, () => {
      // @Input() config =
      SET_INPUT(SCOPE, 'config', {
        columns: [
          { alias: 'id', label: 'ID' },
          { alias: '-', label: '-' },
        ],
        sorting: {
          type: TableActions.Single,
          columns: [{ alias: 'id', order: null }],
        },
        uniqIdKey: 'id',
      } as TableConfigInterface);
      // @Input() data =
      SET_INPUT(SCOPE, 'data', THREE_ITEMS);
    });

    const sortableDebugElements = SCOPE.DEBUG_ELEMENTS['HEADER']?.queryAll(
      By.css('[data-e2e="label sortable"]')
    );

    const allDebugElements = SCOPE.DEBUG_ELEMENTS['HEADER']?.queryAll(
      By.css('[data-e2e^="label"]')
    );

    expect(sortableDebugElements).toBeDefined();
    expect(sortableDebugElements?.length).toBe(1);
    expect(allDebugElements).toBeDefined();
    expect(allDebugElements?.length).toBe(2);
  });

  it(`sorting can be predefined. case Single, order ASC`, () => {
    INIT(SCOPE, () => {
      // @Input() config =
      SET_INPUT(SCOPE, 'config', {
        columns: [{ alias: 'id', label: 'ID' }],
        sorting: {
          type: TableActions.Single,
          columns: [{ alias: 'id', order: TableConfigSortingOrders.Asc }],
        },
        uniqIdKey: 'id',
      } as TableConfigInterface);
      // @Input() data =
      SET_INPUT(SCOPE, 'data', THREE_ITEMS);
    });

    const debugElement = SCOPE.DEBUG_ELEMENTS['HEADER']?.query(
      By.css('[data-e2e="label sortable"]')
    );

    const debugIndicatorElement = debugElement?.query(
      By.css('[data-e2e^="direction"]')
    );

    expect(debugElement).toBeDefined();
    expect(debugElement).not.toBeNull();
    expect(debugIndicatorElement).toBeDefined();
    expect(debugIndicatorElement).not.toBeNull();
    expect(debugIndicatorElement?.nativeElement.getAttribute('data-e2e')).toBe(
      'direction asc'
    );
  });

  it(`sorting can be predefined. case Single, order DESC`, () => {
    INIT(SCOPE, () => {
      // @Input() config =
      SET_INPUT(SCOPE, 'config', {
        columns: [{ alias: 'id', label: 'ID' }],
        sorting: {
          type: TableActions.Single,
          columns: [{ alias: 'id', order: TableConfigSortingOrders.Desc }],
        },
        uniqIdKey: 'id',
      } as TableConfigInterface);
      // @Input() data =
      SET_INPUT(SCOPE, 'data', THREE_ITEMS);
    });

    const debugElement = SCOPE.DEBUG_ELEMENTS['HEADER']?.query(
      By.css('[data-e2e="label sortable"]')
    );

    const debugIndicatorElement = debugElement?.query(
      By.css('[data-e2e^="direction"]')
    );

    expect(debugElement).toBeDefined();
    expect(debugElement).not.toBeNull();
    expect(debugIndicatorElement).toBeDefined();
    expect(debugIndicatorElement).not.toBeNull();
    expect(debugIndicatorElement?.nativeElement.getAttribute('data-e2e')).toBe(
      'direction desc'
    );
  });

  it(`config.sorting.columns is empty array sorted columns size should be 0`, () => {
    INIT(SCOPE, () => {
      SET_INPUT(SCOPE, 'config', {
        columns: [
          { alias: 'id', label: 'ID' },
          { alias: '-', label: '-' },
        ],
        sorting: {
          type: TableActions.Single,
          columns: [],
        },
      });
    });
    expect(SCOPE.COMPONENT.sortedColumns.size).toBe(0);
  });

  it(`last sorted column should be first sorted column in config. case Single, order ASC`, () => {
    INIT(SCOPE, () => {
      // @Input() config =
      SET_INPUT(SCOPE, 'config', {
        columns: [
          { alias: 'id', label: 'ID' },
          { alias: 'name', label: 'Name' },
        ],
        sorting: {
          type: TableActions.Single,
          columns: [
            { alias: 'id', order: TableConfigSortingOrders.Asc },
            { alias: 'name', order: TableConfigSortingOrders.Asc },
          ],
        },
        uniqIdKey: 'id',
      } as TableConfigInterface);
      // @Input() data =
      SET_INPUT(SCOPE, 'data', THREE_ITEMS);
    });

    expect(SCOPE.COMPONENT['lastSortedColumn']).toBeDefined();
    expect(SCOPE.COMPONENT['lastSortedColumn']).not.toBeNull();
    expect(SCOPE.COMPONENT['lastSortedColumn'].alias).toBe('id');
  });

  it(`last sorted column should be first sorted column in config. case Single, order DESC`, () => {
    INIT(SCOPE, () => {
      // @Input() config =
      SET_INPUT(SCOPE, 'config', {
        columns: [
          { alias: 'id', label: 'ID' },
          { alias: 'name', label: 'Name' },
        ],
        sorting: {
          type: TableActions.Single,
          columns: [
            { alias: 'name', order: TableConfigSortingOrders.Asc },
            { alias: 'id', order: TableConfigSortingOrders.Asc },
          ],
        },
        uniqIdKey: 'id',
      } as TableConfigInterface);
      // @Input() data =
      SET_INPUT(SCOPE, 'data', THREE_ITEMS);
    });

    expect(SCOPE.COMPONENT['lastSortedColumn']).toBeDefined();
    expect(SCOPE.COMPONENT['lastSortedColumn']).not.toBeNull();
    expect(SCOPE.COMPONENT['lastSortedColumn'].alias).toBe('name');
  });

  it(`sorted column map size should be 1. case Single, order ASC`, () => {
    INIT(SCOPE, () => {
      // @Input() config =
      SET_INPUT(SCOPE, 'config', {
        columns: [
          { alias: 'id', label: 'ID' },
          { alias: '-', label: '-' },
        ],
        sorting: {
          type: TableActions.Single,
          columns: [
            { alias: 'id', order: TableConfigSortingOrders.Asc },
            { alias: '-', order: TableConfigSortingOrders.Asc },
          ],
        },
        uniqIdKey: 'id',
      } as TableConfigInterface);
      // @Input() data =
      SET_INPUT(SCOPE, 'data', THREE_ITEMS);
    });

    expect(SCOPE.COMPONENT.sortedColumns.size).toBe(1);
  });

  it(`sorted column map size should be 1. case Single, order DESC`, () => {
    INIT(SCOPE, () => {
      // @Input() config =
      SET_INPUT(SCOPE, 'config', {
        columns: [
          { alias: 'id', label: 'ID' },
          { alias: '-', label: '-' },
        ],
        sorting: {
          type: TableActions.Single,
          columns: [
            { alias: 'id', order: TableConfigSortingOrders.Desc },
            { alias: '-', order: TableConfigSortingOrders.Asc },
          ],
        },
        uniqIdKey: 'id',
      } as TableConfigInterface);
      // @Input() data =
      SET_INPUT(SCOPE, 'data', THREE_ITEMS);
    });

    expect(SCOPE.COMPONENT.sortedColumns.size).toBe(1);
  });

  it(`on click change ASC to DESC to Null to ASC. case Single`, () => {
    INIT(SCOPE, () => {
      // @Input() config =
      SET_INPUT(SCOPE, 'config', {
        columns: [
          { alias: 'id', label: 'ID' },
          { alias: '-', label: '-' },
        ],
        sorting: {
          type: TableActions.Single,
          columns: [{ alias: 'id', order: TableConfigSortingOrders.Asc }],
        },
        uniqIdKey: 'id',
      } as TableConfigInterface);
      // @Input() data =
      SET_INPUT(SCOPE, 'data', THREE_ITEMS);
    });

    const debugElement = SCOPE.DEBUG_ELEMENTS['HEADER']?.query(
      By.css('[data-e2e="label sortable"]')
    );

    const entries = SCOPE.COMPONENT.columns.entries();
    const column = entries.next().value[0];

    expect(SCOPE.COMPONENT.sortedColumns.get(column)?.order).toBe(
      TableConfigSortingOrders.Asc
    );
    debugElement?.triggerEventHandler('click');
    SCOPE.FIXTURE.detectChanges();
    expect(SCOPE.COMPONENT.sortedColumns.get(column)?.order).toBe(
      TableConfigSortingOrders.Desc
    );
    debugElement?.triggerEventHandler('click');
    SCOPE.FIXTURE.detectChanges();
    expect(SCOPE.COMPONENT.sortedColumns.get(column)?.order).toBe(null);
    debugElement?.triggerEventHandler('click');
    SCOPE.FIXTURE.detectChanges();
    expect(SCOPE.COMPONENT.sortedColumns.get(column)?.order).toBe(
      TableConfigSortingOrders.Asc
    );
  });

  it(`next column click should set order to Null on previous column. case Single`, () => {
    INIT(SCOPE, () => {
      // @Input() config =
      SET_INPUT(SCOPE, 'config', {
        columns: [
          { alias: 'id', label: 'ID' },
          { alias: '-', label: '-' },
        ],
        sorting: {
          type: TableActions.Single,
          columns: [
            { alias: 'id', order: TableConfigSortingOrders.Asc },
            { alias: '-', order: TableConfigSortingOrders.Asc },
          ],
        },
        uniqIdKey: 'id',
      } as TableConfigInterface);
      // @Input() data =
      SET_INPUT(SCOPE, 'data', THREE_ITEMS);
    });

    const debugElements = SCOPE.DEBUG_ELEMENTS['HEADER']?.queryAll(
      By.css('[data-e2e="label sortable"]')
    );

    expect(debugElements?.length).toBe(2);

    const entries = SCOPE.COMPONENT.columns.entries();
    const firstColumn = entries.next().value[0];
    const secondColumn = entries.next().value[0];

    expect(SCOPE.COMPONENT.sortedColumns.get(firstColumn)?.order).toBe(
      TableConfigSortingOrders.Asc
    );
    expect(SCOPE.COMPONENT.sortedColumns.get(firstColumn)?.alias).toBe('id');
    expect(SCOPE.COMPONENT['lastSortedColumn']).toBe(firstColumn);

    debugElements?.[1].triggerEventHandler('click');
    SCOPE.FIXTURE.detectChanges();
    expect(SCOPE.COMPONENT.sortedColumns.get(firstColumn)).toBeUndefined();
    expect(SCOPE.COMPONENT.sortedColumns.get(secondColumn)).toBeDefined();
    expect(SCOPE.COMPONENT.sortedColumns.get(secondColumn)?.order).toBe(
      TableConfigSortingOrders.Asc
    );
  });
};
