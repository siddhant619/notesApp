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
  selectedItems:string[] = [];
  initialColor:string=''
  message:string=''
  isLoading:boolean=false;
  currentNote: Note={id:'', title:'', content:'', isPinned:false, tags:[], color:'',last_modified:new Date}
  constructor( private route: ActivatedRoute, private notesSvc: NotesService, private tagSvc: TagService) { }

  ngOnInit(): void {
    this.getTags();
    this.route.params
      .subscribe(async (params)=>{
        this.id= params['id'] 
        this.currentNote= await this.notesSvc.getNote(this.id)
        let tmp:string[]=[];
        this.currentNote.tags.map(tag=>{
          tmp.push(tag.id)
        })
        this.selectedItems=tmp;
        this.initialColor=this.currentNote.color
      })
  }
  async getTags(){
    this.tagOptions = await this.tagSvc.getTags()
  }
  isTagsEqual(newTags: string[]):boolean{
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
    this.currentNote.title===f.value["edit-note-title"]&&
    this.currentNote.color===this.initialColor&&
    this.isTagsEqual(f.value["edit-note-tags"])
    ) 
      {
        return;
      }
    this.isLoading=true;
    this.notesSvc.updateNote(this.currentNote.id, f.value["edit-note-title"], 
    f.value["edit-note-content"],f.value["edit-note-color"],new Date(), f.value["edit-note-tags"], )
    .subscribe({
      next: (responseData)=>{
        console.log(responseData);
        this.message="Note Updated!";
        this.isLoading=false;
      },
      error: (error)=>{
        console.log(error);
        this.message=error.statusText;
        this.isLoading=false;
      }
    })
  }

}
