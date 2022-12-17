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
  tagOptions:Tag[] = [];
  selectedItems:Tag[]  = [];

    cars = [
        { id: 1, name: 'Volvo' },
        { id: 2, name: 'Saab' },
        { id: 3, name: 'Opel' },
        { id: 4, name: 'Audi' },
    ];
  constructor(private tagSvc: TagService, private notesSvc: NotesService) { }
  ngOnInit() {
    this.tagOptions = this.tagSvc.getTags()
    
  }

  onSubmit(f: NgForm){
    this.notesSvc.createNote(f.value["new-note-title"],f.value["new-note-content"], f.value["new-note-color"],
    f.value["new-note-tags"] )
    console.log(f);
  }
}
