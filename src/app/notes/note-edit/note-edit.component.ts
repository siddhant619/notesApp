import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';
import { Tag } from 'src/app/shared/tag.model';
import { TagService } from 'src/app/shared/tag.service';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css']
})
export class NoteEditComponent implements OnInit {
  id: string=''
  tagOptions:Tag[] = [];
  selectedItems:Number[] = [];
  currentNote: Note={id:'', title:'', content:'', isPinned:false, tags:[], color:'',last_modified:new Date}
  constructor( private route: ActivatedRoute, private notesSvc: NotesService, private tagSvc: TagService) { }

  ngOnInit(): void {
    this.getTags();
    this.route.params
      .subscribe(async (params)=>{
        this.id= params['id'] 
        this.currentNote= await this.notesSvc.getNote(this.id)
        let tmp:Number[]=[];
        this.currentNote.tags.map(tag=>{
          tmp.push(tag.id)
        })
        this.selectedItems=tmp;
      })
  }
  async getTags(){
    this.tagOptions = await this.tagSvc.getTags()
  }
  isTagsEqual(newTags: number[]):boolean{
    const tagIds=this.currentNote.tags.map(tag=>{
      return tag.id
    })
    if(newTags.length===tagIds.length){
      for(let element of newTags){
        if(!tagIds.includes(element))
          return false
      }
      return true;
    }
    else
      return false;
    
    
  }
  onSubmit(f: NgForm){
    if(this.currentNote.content===f.value["edit-note-content"]&& 
    this.currentNote.color===f.value["edit-note-color"]&&
    this.currentNote.title===f.value["edit-note-title"]&&
    this.isTagsEqual(f.value["edit-note-tags"])
    ) 
      {
        return;
      }
    this.notesSvc.updateNote(this.currentNote.id, f.value["edit-note-title"], 
    f.value["edit-note-content"],f.value["edit-note-color"],new Date(), f.value["edit-note-tags"], )
    .subscribe(responseData=>{
      console.log('updated data')
    })
  }

}
