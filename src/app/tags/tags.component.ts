import { Component, OnInit } from '@angular/core';
import { Tag } from '../shared/tag.model';
import { TagService } from '../shared/tag.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tags: Tag[]=[];
  constructor(private tagSvc: TagService) { }

  async ngOnInit() {
    this.tags=await this.tagSvc.getTags()
    
  }
  


}
