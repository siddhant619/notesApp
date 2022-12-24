import { Component, OnInit } from '@angular/core';
import { Tag } from '../shared/tag.model';
import { TagService } from '../shared/tag.service';
import { faFloppyDisk,faTrash,faPlusCircle } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  faFloppyDisk=faFloppyDisk;
  faTrash=faTrash;
  faPlusCircle=faPlusCircle
  tags: Tag[]=[
    
];
  constructor(private tagSvc: TagService) { }

  async ngOnInit() {
    this.tags=await this.tagSvc.getTags()

    console.log(this.tags)
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

}
