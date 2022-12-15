import { Component, OnInit } from '@angular/core';
import { Note } from '../shared/note.model';
import { NotesService } from '../shared/notes.service';
import { Tag } from '../shared/tag.model';
import { TagService } from '../shared/tag.service';
import { faThumbTack } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  faThumbTack=faThumbTack
  notes: Note[]=[];
  tagOptions:Tag[] = [];
  selectedItems:Tag[]  = [];
  dropdownSettings = {};
  constructor(private tagSvc: TagService, private notesSvc: NotesService) { }
  ngOnInit() {
    this.notes= this.notesSvc.getNotes()
    //console.log(this.notes);
    
    this.tagOptions = this.tagSvc.getTags()
    this.selectedItems = this.tagSvc.getSelectedTags()
      console.log(this.selectedItems)
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
