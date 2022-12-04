import { Tag } from "./tag.model";

export class TagService{
    private tags: Tag[]=[
        new Tag(1,'HTML'),
        new Tag(2,'CSS'),
        new Tag(3,'Javascirpt'),
        new Tag(4,'C++'),
        new Tag(5,'Algorithms'),
        new Tag(6,'Database'),
        
    ]
    getTags(){
        return this.tags 
    }
    getSelectedTags(){
        return [this.tags[0],this.tags[2],this.tags[3],this.tags[5], ]
    }
}