import { Directive, ElementRef, Input } from '@angular/core';

@Directive({ selector: '[checkAllStatus]' })
export class CheckAllStatusDirective {
  @Input()
  set checkAllStatus(value: boolean | unknown) {
    const checkBoxElement = this.elem.nativeElement as HTMLInputElement;
    if (typeof value === 'boolean') {
      checkBoxElement.checked = value;
      checkBoxElement.indeterminate = false;
    } else {
      checkBoxElement.checked = false;
      checkBoxElement.indeterminate = true;
    }
  }

  constructor(private elem: ElementRef) {}
}
