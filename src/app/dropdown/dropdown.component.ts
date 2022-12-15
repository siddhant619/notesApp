import { Component, ElementRef, forwardRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Tag } from '../shared/tag.model';
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }]
})
export class DropdownComponent implements OnInit,ControlValueAccessor  {
  faArrowDown=faArrowDown
  faArrowUp=faArrowUp
  isDropdownOpen: boolean= false
  //selectedItems: Tag[]=[]
  selectedItems="abckwef wefs"
  @Input() options: Tag[]=[]
  onChange: any = () => {};
  onTouched: any = () => {};
  @ViewChild('dropdownInput') dropdownInput!: ElementRef ;
  @ViewChild('menu') menu!: ElementRef ;
  constructor(private renderer: Renderer2) {
    this.renderer.listen('window', 'click',(e:Event)=>{
      /**
       * Only run when toggleButton is not clicked
       * If we don't check this, all clicks (even on the toggle button) gets into this
       * section which in the result we might never see the menu open!
       * And the menu itself is checked here, and it's where we check just outside of
       * the menu and button the condition abbove must close the menu
       */
     /* if(e.target !== this.dropdownInput.nativeElement && e.target!==this.menu.nativeElement){
         this.isDropdownOpen=false;
     } */
     //close dropdown

 });
   }

  ngOnInit(): void {
  }
  writeValue(obj: any): void {
    this.selectedItems = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
 }
 registerOnTouched(fn: any): void {
    this.onTouched = fn;
 }
  onDropdownClicked(){
    console.log('dropdown clicked!')
    this.isDropdownOpen=!this.isDropdownOpen
  }
  ontagclicked(){
    console.log('tag clicked')
  }
  onOutsideClick(){
    console.log('on outside click men');
    if(this.isDropdownOpen)
      this.isDropdownOpen=false
    
  }

}
