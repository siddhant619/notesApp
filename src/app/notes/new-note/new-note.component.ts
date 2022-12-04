import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/shared/tag.model';
import { TagService } from 'src/app/shared/tag.service';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.css']
})
export class NewNoteComponent implements OnInit {

  dropdownList:Tag[] = [];
  selectedItems:Tag[]  = [];
  dropdownSettings = {};
  constructor(private tagSvc: TagService) { }
  ngOnInit() {
    this.dropdownList = this.tagSvc.getTags()
      
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true,
      maxHeight:130
    };
  }
  onItemSelect(item: any) {
    console.log(item);

  }
  onDeSelect(item: any){
    console.log(item)
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onTitleChange(e:Event){
    console.log(e);
    
  }

}
