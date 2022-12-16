import { Tag } from "./tag.model";

export class Note{
    
    constructor(
        public id: number,
        public title:string,
        public content: string,
        public color: string, 
        public last_modified: Date,
        public tags: Tag[], 
        public isPinned: boolean 
        ){
    }
}