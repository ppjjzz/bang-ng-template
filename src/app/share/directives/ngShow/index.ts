import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[ngShow]'
})
export class NgShowDirective {
  constructor(private el: ElementRef) { }
  @Input()
  set ngShow(val: any) {
    if (val) {
      this.el.nativeElement.style.display = '';
    } else {
      this.el.nativeElement.style.display = 'none';
    }
  }

}
