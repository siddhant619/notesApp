import { Component, OnInit } from '@angular/core';
import { Tag } from '../shared/tag.model';
import { TagService } from '../shared/tag.service';

import { faFloppyDisk,faTrash,faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { NotesService } from '../shared/notes.service';
@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  faFloppyDisk=faFloppyDisk;
  faTrash=faTrash;
  faPlusCircle=faPlusCircle
  tags: Tag[]=[];
  showSpinner: boolean=false
  constructor(private tagSvc: TagService, private notesSvc: NotesService) { }

  async ngOnInit() {
    this.tags=await this.tagSvc.getTags()
  }
  
  onAddTagInput(){
    this.tags.push({
      id:'',
      text:''
    })
  }
  onSaveTag(index:number){
    if(this.tags[index].id===''){ //create tag
      this.tagSvc.createTag(this.tags[index].text)
    }
    else{ //update tag
      this.tagSvc.updateTag(this.tags[index].id,this.tags[index].text)
    }
  }
  async onDeleteTag(index: number){
    //console.log('Deleting tag: ',this.tags[index].text )
    this.showSpinner=true;
    try{ //delete successful
      await this.notesSvc.updateNotesTag(this.tags[index].id)
      await this.tagSvc.deleteTag(this.tags[index].id)
      
      this.tags.splice(index,1)
    }
    catch(e){
      console.log(e)
    }
    this.showSpinner=false;
  }

}
