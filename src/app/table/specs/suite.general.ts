import { By } from '@angular/platform-browser';

import {
  INIT,
  BEFORE_EACH,
  SET_INPUT,
  REINIT_ELEMENTS,
  CREATE_EMAIL_TEMPLATE,
} from './helpers';

import { ONE_ITEM, THREE_ITEMS } from './mock.data';

export const GeneralDescribe = () => {
  let SCOPE: any = {};

  beforeEach(async () => {
    await BEFORE_EACH(SCOPE);
  });

  it('display `no config` when none input provided', () => {
    INIT(SCOPE);

    expect(SCOPE.DEBUG_ELEMENTS['ROOT']).toBeNull();
    expect(SCOPE.HTML_ELEMENTS['ROOT']).toBeUndefined();
    expect(SCOPE.DEBUG_ELEMENTS['NO_CONFIG']).not.toBeNull();
    expect(SCOPE.HTML_ELEMENTS['NO_CONFIG']).toBeDefined();
    expect(SCOPE.DEBUG_ELEMENTS['NO_DATA']).toBeNull();
    expect(SCOPE.HTML_ELEMENTS['NO_DATA']).toBeUndefined();
    expect(SCOPE.DEBUG_ELEMENTS['EMPTY_DATA']).toBeNull();
    expect(SCOPE.HTML_ELEMENTS['EMPTY_DATA']).toBeUndefined();
  });

  it(`can be only config provided`, () => {
    INIT(SCOPE, () => {
      // @Input() config =
      SET_INPUT(SCOPE, 'config', { columns: [], uniqIdKey: 'id' });
    });

    expect(SCOPE.DEBUG_ELEMENTS['ROOT']).toBeDefined();
    expect(SCOPE.HTML_ELEMENTS['ROOT']).toBeDefined();
    expect(SCOPE.DEBUG_ELEMENTS['NO_CONFIG']).toBeNull();
    expect(SCOPE.HTML_ELEMENTS['NO_CONFIG']).toBeUndefined();
    expect(SCOPE.DEBUG_ELEMENTS['NO_DATA']).toBeDefined();
    expect(SCOPE.HTML_ELEMENTS['NO_DATA']).toBeDefined();
    expect(SCOPE.DEBUG_ELEMENTS['EMPTY_DATA']).toBeNull();
    expect(SCOPE.HTML_ELEMENTS['EMPTY_DATA']).toBeUndefined();
  });

  it(`display 'no data' when config specified and data has not`, () => {
    INIT(SCOPE, () => {
      // @Input() config =
      SET_INPUT(SCOPE, 'config', {
        columns: [{ alias: 'id', label: 'ID' }],
        uniqIdKey: 'id',
      });
    });

    expect(SCOPE.DEBUG_ELEMENTS['ROOT']).toBeDefined();
    expect(SCOPE.HTML_ELEMENTS['ROOT']).toBeDefined();
    expect(SCOPE.DEBUG_ELEMENTS['NO_CONFIG']).toBeNull();
    expect(SCOPE.HTML_ELEMENTS['NO_CONFIG']).toBeUndefined();
    expect(SCOPE.DEBUG_ELEMENTS['NO_DATA']).toBeDefined();
    expect(SCOPE.HTML_ELEMENTS['NO_DATA']).toBeDefined();
    expect(SCOPE.DEBUG_ELEMENTS['EMPTY_DATA']).toBeNull();
    expect(SCOPE.HTML_ELEMENTS['EMPTY_DATA']).toBeUndefined();
  });

  it(`display 'no data' when config specified and data is null`, () => {
    INIT(SCOPE, () => {
      // @Input() config =
      SET_INPUT(SCOPE, 'config', {
        columns: [{ alias: 'id', label: 'ID' }],
        uniqIdKey: 'id',
      });
      // @Input() data =
      SET_INPUT(SCOPE, 'data', null);
    });

    expect(SCOPE.DEBUG_ELEMENTS['ROOT']).toBeDefined();
    expect(SCOPE.HTML_ELEMENTS['ROOT']).toBeDefined();
    expect(SCOPE.DEBUG_ELEMENTS['NO_CONFIG']).toBeNull();
    expect(SCOPE.HTML_ELEMENTS['NO_CONFIG']).toBeUndefined();
    expect(SCOPE.DEBUG_ELEMENTS['NO_DATA']).toBeDefined();
    expect(SCOPE.HTML_ELEMENTS['NO_DATA']).toBeDefined();
    expect(SCOPE.DEBUG_ELEMENTS['EMPTY_DATA']).toBeNull();
    expect(SCOPE.HTML_ELEMENTS['EMPTY_DATA']).toBeUndefined();
  });

  it(`display 'no data' when config specified and data is [<empty>]`, () => {
    INIT(SCOPE, () => {
      // @Input() config =
      SET_INPUT(SCOPE, 'config', {
        columns: [{ alias: 'id', label: 'ID' }],
        uniqIdKey: 'id',
      });
      // @Input() data =
      SET_INPUT(SCOPE, 'data', []);
    });

    expect(SCOPE.DEBUG_ELEMENTS['ROOT']).toBeDefined();
    expect(SCOPE.HTML_ELEMENTS['ROOT']).toBeDefined();
    expect(SCOPE.DEBUG_ELEMENTS['NO_CONFIG']).toBeNull();
    expect(SCOPE.HTML_ELEMENTS['NO_CONFIG']).toBeUndefined();
    expect(SCOPE.DEBUG_ELEMENTS['NO_DATA']).toBeNull();
    expect(SCOPE.HTML_ELEMENTS['NO_DATA']).toBeUndefined();
    expect(SCOPE.DEBUG_ELEMENTS['EMPTY_DATA']).toBeDefined();
    expect(SCOPE.HTML_ELEMENTS['EMPTY_DATA']).toBeDefined();
  });

  it(`display row of statick data`, () => {
    INIT(SCOPE, () => {
      // @Input() config =
      SET_INPUT(SCOPE, 'config', {
        columns: [{ alias: 'id', label: 'ID' }],
        uniqIdKey: 'id',
      });
      // @Input() data =
      SET_INPUT(SCOPE, 'data', [
        {
          id: '31558be5-78f6-40d6-8c35-c94ebf36da99',
        },
      ]);
    });

    expect(SCOPE.DEBUG_ELEMENTS['ROOT']).toBeDefined();
    expect(SCOPE.HTML_ELEMENTS['ROOT']).toBeDefined();
    expect(SCOPE.DEBUG_ELEMENTS['NO_CONFIG']).toBeNull();
    expect(SCOPE.HTML_ELEMENTS['NO_CONFIG']).toBeUndefined();
    expect(SCOPE.DEBUG_ELEMENTS['NO_DATA']).toBeNull();
    expect(SCOPE.HTML_ELEMENTS['NO_DATA']).toBeUndefined();
    expect(SCOPE.DEBUG_ELEMENTS['EMPTY_DATA']).toBeDefined();

    expect(SCOPE.DEBUG_ELEMENTS['ROWS']).not.toBeNull();
    expect(SCOPE.DEBUG_ELEMENTS['ROWS'].length).toBe(1);
    expect(SCOPE.DEBUG_ELEMENTS['ROWS'][0].nativeElement).toBeDefined();
  });

  it(`display row of when async data`, () => {
    INIT(SCOPE, () => {
      // @Input() config =
      SET_INPUT(SCOPE, 'config', {
        columns: [{ alias: 'id', label: 'ID' }],
        uniqIdKey: 'id',
      });
      // @Input() data =
      SET_INPUT(SCOPE, 'data', null);
    });

    SET_INPUT(SCOPE, 'data', [ONE_ITEM]);
    SCOPE.FIXTURE.detectChanges();

    REINIT_ELEMENTS(SCOPE);

    expect(SCOPE.DEBUG_ELEMENTS['ROOT']).toBeDefined();
    expect(SCOPE.HTML_ELEMENTS['ROOT']).toBeDefined();
    expect(SCOPE.DEBUG_ELEMENTS['NO_CONFIG']).toBeNull();
    expect(SCOPE.HTML_ELEMENTS['NO_CONFIG']).toBeUndefined();
    expect(SCOPE.DEBUG_ELEMENTS['NO_DATA']).toBeNull();
    expect(SCOPE.HTML_ELEMENTS['NO_DATA']).toBeUndefined();
    expect(SCOPE.DEBUG_ELEMENTS['EMPTY_DATA']).toBeNull();

    expect(SCOPE.DEBUG_ELEMENTS['ROWS']).not.toBeNull();
    expect(SCOPE.DEBUG_ELEMENTS['ROWS'].length).toBe(1);
    expect(SCOPE.DEBUG_ELEMENTS['ROWS'][0].nativeElement).toBeDefined();
  });

  it(`data item value can be described as a path`, () => {
    INIT(SCOPE, () => {
      // @Input() config =
      SET_INPUT(SCOPE, 'config', {
        columns: [
          { alias: 'id', label: 'ID' },
          { alias: 'name.firstName', label: 'First name' },
        ],
        uniqIdKey: 'id',
      });
      // @Input() data =
      SET_INPUT(SCOPE, 'data', [
        {
          id: '31558be5-78f6-40d6-8c35-c94ebf36da99',
          name: {
            firstName: 'John',
          },
        },
      ]);
    });

    const value =
      SCOPE.DEBUG_ELEMENTS['ROWS'][0].nativeElement.querySelectorAll('td')[1]
        .textContent;

    expect(value).toBe('John');
  });

  it(`data item value described as a path will display empty template if not exist`, () => {
    INIT(SCOPE, () => {
      // @Input() config =
      SET_INPUT(SCOPE, 'config', {
        columns: [
          { alias: 'id', label: 'ID' },
          { alias: 'name.lastName', label: 'Last name' },
        ],
        uniqIdKey: 'id',
      });
      // @Input() data =
      SET_INPUT(SCOPE, 'data', [
        {
          id: '31558be5-78f6-40d6-8c35-c94ebf36da99',
          name: {
            firstName: 'John',
          },
        },
      ]);
    });

    const value =
      SCOPE.DEBUG_ELEMENTS['ROWS'][0].nativeElement.querySelectorAll('td')[1]
        .textContent;

    expect(value).toBe('—');
  });

  it(`should display more than one row`, () => {
    INIT(SCOPE, () => {
      // @Input() config =
      SET_INPUT(SCOPE, 'config', {
        columns: [{ alias: 'id', label: 'ID' }],
        uniqIdKey: 'id',
      });
      // @Input() data =
      SET_INPUT(SCOPE, 'data', THREE_ITEMS);
    });

    expect(SCOPE.DEBUG_ELEMENTS['ROWS'].length).toBe(3);
  });

  it(`cell can be defined with template`, () => {
    INIT(SCOPE, () => {
      // @Input() config =
      SET_INPUT(SCOPE, 'config', {
        columns: [{ alias: 'email', label: 'Email' }],
        uniqIdKey: 'id',
      });
      // @Input() data =
      SET_INPUT(SCOPE, 'data', [ONE_ITEM]);
    });

    CREATE_EMAIL_TEMPLATE(SCOPE);
    SCOPE.FIXTURES.email.detectChanges();

    SET_INPUT(SCOPE, 'templates', { email: SCOPE.COMPONENTS.email.template });
    SCOPE.FIXTURE.detectChanges();

    const emailCellElement = SCOPE.DEBUG_ELEMENTS['ROWS'][0].query(
      By.css('td')
    ).nativeElement;

    expect(emailCellElement.children[0].outerHTML).toBe(
      `<a href="mailto:${ONE_ITEM.email}">${ONE_ITEM.email}</a>`
    );
  });

  it(`config can be changed later if it was initially defined`, () => {
    INIT(SCOPE, () => {
      // @Input() config =
      SET_INPUT(SCOPE, 'config', {
        columns: [{ alias: 'id', label: 'ID' }],
        uniqIdKey: 'id',
      });
      // @Input() data =
      SET_INPUT(SCOPE, 'data', null);
    });

    SET_INPUT(SCOPE, 'config', {
      columns: [
        { alias: 'id', label: 'ID' },
        { alias: 'email', label: 'Email' },
      ],
      uniqIdKey: 'id',
    });

    SCOPE.FIXTURE.detectChanges();

    expect(SCOPE.COMPONENT.columns.size).toBe(2);
  });
};
