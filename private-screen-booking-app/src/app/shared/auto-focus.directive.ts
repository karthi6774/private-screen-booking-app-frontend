import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements AfterViewInit {

  constructor(private elRef: ElementRef) { }
  ngAfterViewInit(): void {
    this.elRef.nativeElement.focus();
  }


}


