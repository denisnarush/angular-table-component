import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { TableComponent } from './table.component';

describe('TableComponent', () => {
  const DELAY = 5;
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let rootDebugElement: DebugElement;
  let rootHtmlElement: HTMLElement;
  let noConfigDebugElement: DebugElement;
  let noConfigHTMLElement: HTMLElement;
  let noDataDebugElement: DebugElement;
  let noDataHTMLElement: HTMLElement;
  let emptyDataDebugElement: DebugElement;
  let emptyDataHTMLElement: HTMLElement;

  let rowDebugElements: DebugElement[];

  function reCreate() {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
  }

  function reInitElements() {
    rootDebugElement = fixture.debugElement.query(By.css('.table-container'));
    rootHtmlElement = rootDebugElement?.nativeElement;

    noConfigDebugElement = fixture.debugElement.query(
      By.css('[data-e2e="no-config')
    );
    noConfigHTMLElement = noConfigDebugElement?.nativeElement;

    noDataDebugElement = fixture.debugElement.query(
      By.css('[data-e2e="no-data')
    );
    noDataHTMLElement = noDataDebugElement?.nativeElement;

    emptyDataDebugElement = fixture.debugElement.query(
      By.css('[data-e2e="empty-data')
    );
    emptyDataHTMLElement = emptyDataDebugElement?.nativeElement;

    rowDebugElements = fixture.debugElement.queryAll(
      By.css('[data-e2e="data-row')
    );
  }

  function init(beforeOnInit = () => {}) {
    reCreate();
    beforeOnInit();
    fixture.detectChanges();
    reInitElements();
  }

  function setInput(name: string, value: unknown) {
    fixture.componentRef.setInput(name, value);
  }

  beforeEach(async () => {
    jasmine.clock().install();
    await TestBed.configureTestingModule({
      declarations: [TableComponent],
    }).compileComponents();

    reCreate();
    fixture.detectChanges();
  });

  afterEach(async () => {
    jasmine.clock().uninstall();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('display `no config` when none input provided', () => {
    init();

    expect(rootDebugElement).toBeNull();
    expect(rootHtmlElement).toBeUndefined();
    expect(noConfigDebugElement).toBeDefined();
    expect(noConfigHTMLElement).toBeDefined();
    expect(noDataDebugElement).toBeNull();
    expect(noDataHTMLElement).toBeUndefined();
    expect(emptyDataDebugElement).toBeNull();
    expect(emptyDataHTMLElement).toBeUndefined();
  });

  it(`can be only input provided`, () => {
    init(() => {
      // @Input() config =
      setInput('config', { columns: [], uniqIdKey: 'id' });
    });

    expect(rootDebugElement).toBeDefined();
    expect(rootHtmlElement).toBeDefined();
    expect(noConfigDebugElement).toBeNull();
    expect(noConfigHTMLElement).toBeUndefined();
    expect(noDataDebugElement).toBeDefined();
    expect(noDataHTMLElement).toBeDefined();
    expect(emptyDataDebugElement).toBeNull();
    expect(emptyDataHTMLElement).toBeUndefined();
  });

  it(`display 'no data' when config specified and data has not`, () => {
    init(() => {
      // @Input() config =
      setInput('config', {
        columns: [{ alias: 'id', label: 'ID' }],
        uniqIdKey: 'id',
      });
    });

    expect(rootDebugElement).toBeDefined();
    expect(rootHtmlElement).toBeDefined();
    expect(noConfigDebugElement).toBeNull();
    expect(noConfigHTMLElement).toBeUndefined();
    expect(noDataDebugElement).toBeDefined();
    expect(noDataHTMLElement).toBeDefined();
    expect(emptyDataDebugElement).toBeNull();
    expect(emptyDataHTMLElement).toBeUndefined();
  });

  it(`display 'no data' when config specified and data is null`, () => {
    init(() => {
      // @Input() config =
      setInput('config', {
        columns: [{ alias: 'id', label: 'ID' }],
        uniqIdKey: 'id',
      });
      // @Input() data =
      setInput('data', null);
    });

    expect(rootDebugElement).toBeDefined();
    expect(rootHtmlElement).toBeDefined();
    expect(noConfigDebugElement).toBeNull();
    expect(noConfigHTMLElement).toBeUndefined();
    expect(noDataDebugElement).toBeDefined();
    expect(noDataHTMLElement).toBeDefined();
    expect(emptyDataDebugElement).toBeNull();
    expect(emptyDataHTMLElement).toBeUndefined();
  });

  it(`display 'no data' when config specified and data is [<empty>]`, () => {
    init(() => {
      // @Input() config =
      setInput('config', {
        columns: [{ alias: 'id', label: 'ID' }],
        uniqIdKey: 'id',
      });
      // @Input() data =
      setInput('data', []);
    });

    expect(rootDebugElement).toBeDefined();
    expect(rootHtmlElement).toBeDefined();
    expect(noConfigDebugElement).toBeNull();
    expect(noConfigHTMLElement).toBeUndefined();
    expect(noDataDebugElement).toBeNull();
    expect(noDataHTMLElement).toBeUndefined();
    expect(emptyDataDebugElement).toBeDefined();
    expect(emptyDataHTMLElement).toBeDefined();
  });

  it(`display row of statick data`, () => {
    init(() => {
      // @Input() config =
      setInput('config', {
        columns: [{ alias: 'id', label: 'ID' }],
        uniqIdKey: 'id',
      });
      // @Input() data =
      setInput('data', [
        {
          id: '31558be5-78f6-40d6-8c35-c94ebf36da99',
        },
      ]);
    });

    expect(rootDebugElement).toBeDefined();
    expect(rootHtmlElement).toBeDefined();
    expect(noConfigDebugElement).toBeNull();
    expect(noConfigHTMLElement).toBeUndefined();
    expect(noDataDebugElement).toBeNull();
    expect(noDataHTMLElement).toBeUndefined();
    expect(emptyDataDebugElement).toBeNull();
    expect(emptyDataHTMLElement).toBeUndefined();
    expect(rowDebugElements).toBeDefined();
    expect(rowDebugElements.length).toBe(1);
    expect(rowDebugElements[0].nativeElement).toBeDefined();
  });

  it(`display row of when async data`, () => {
    init(() => {
      // @Input() config =
      setInput('config', {
        columns: [{ alias: 'id', label: 'ID' }],
        uniqIdKey: 'id',
      });
      // @Input() data =
      setInput('data', null);
    });

    setTimeout(() => {
      fixture.componentRef.setInput('data', [
        {
          id: '31558be5-78f6-40d6-8c35-c94ebf36da99',
        },
      ]);
    }, DELAY);

    jasmine.clock().tick(DELAY);
    fixture.detectChanges();
    reInitElements();

    expect(rootDebugElement).toBeDefined();
    expect(rootHtmlElement).toBeDefined();
    expect(noConfigDebugElement).toBeNull();
    expect(noConfigHTMLElement).toBeUndefined();
    expect(noDataDebugElement).toBeNull();
    expect(noDataHTMLElement).toBeUndefined();
    expect(emptyDataDebugElement).toBeNull();
    expect(emptyDataHTMLElement).toBeUndefined();

    expect(rowDebugElements).toBeDefined();
    expect(rowDebugElements.length).toBe(1);
    expect(rowDebugElements[0].nativeElement).toBeDefined();
  });
});
