import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickedOutside]'
})
export class ClickedOutsideDirective {
  @Output() onClickOutside=  new EventEmitter<MouseEvent>() 

  constructor(private elementRef: ElementRef) { }

  @HostListener('document: click', ['$event', '$event.target'])
   onClick (event: MouseEvent, targetElement: HTMLElement): void {
    if(!targetElement) 
      return;
    console.log(this.elementRef.nativeElement);
    
    const clickedInside= this.elementRef.nativeElement.contains(targetElement)
    if(!clickedInside)
      this.onClickOutside.emit(event)
   }

}
