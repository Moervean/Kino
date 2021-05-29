import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appStyle]'
})
export class StyleDirective {

  constructor(private eleRef: ElementRef) {
    eleRef.nativeElement.style.color = 'white';
    eleRef.nativeElement.style.margin = '35px';
  }

}
