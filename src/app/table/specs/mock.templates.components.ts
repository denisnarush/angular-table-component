import { Component, ViewChild, TemplateRef } from '@angular/core';

@Component({
  template: `<ng-template #email let-empty="empty" let-data
    ><a *ngIf="data.email; else empty" [href]="'mailto:' + data.email">{{
      data.email
    }}</a></ng-template
  >`,
})
export class MockEmailColumnTemplateComponent {
  @ViewChild('email', { read: TemplateRef }) template!: TemplateRef<any>;
}
