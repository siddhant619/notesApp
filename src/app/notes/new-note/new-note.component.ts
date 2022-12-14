import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotesService } from 'src/app/shared/notes.service';
import { Tag } from 'src/app/shared/tag.model';
import { TagService } from 'src/app/shared/tag.service';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.css']
})
export class NewNoteComponent implements OnInit {
  noteColor: string="white"
  showSpinner:boolean=false
  tagOptions:Tag[] = [];
  selectedItems:Number[]  = [];

  constructor(private tagSvc: TagService, private notesSvc: NotesService) { }
  async ngOnInit() {
    this.tagOptions=await this.tagSvc.getTags()
    
  }
  onSubmit(f: NgForm){
    this.showSpinner=true;
    this.notesSvc.createNote(f.value["new-note-title"],f.value["new-note-content"], f.value["new-note-color"],
    f.value["new-note-tags"] )
    .subscribe(responseData=>{
      
      console.log('New note created: ', responseData)
      this.showSpinner=false;
    })
  }
}
