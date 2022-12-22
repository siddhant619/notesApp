import { Injectable } from "@angular/core";
import { DataStorageService } from "./data-storage.service";
import { Tag } from "./tag.model";

@Injectable({
    providedIn: 'root'
  })
export class TagService{
    private tags: Tag[]=[
        new Tag(1,'HTML'),
        new Tag(2,'CSS'),
        new Tag(3,'Javascirpt'),
        new Tag(4,'C++'),
        new Tag(5,'Algorithms'),
        new Tag(6,'Database'),
        
    ]
    constructor( private dataSvc: DataStorageService) { }

    getTags(): Promise<any>{
        //console.log('fetching tags from db')
        return new Promise((resolve, reject)=>{
            this.dataSvc.fetchTags()
                .subscribe({
                    next: (response:any)=>{
                        this.tags=response
                        resolve(this.tags)
                    },
                    error: error=>{
                        console.log('Could not fetch tags: ', error)
                        reject(error)
                      }  
                })
            })
        
    }
    
    getSelectedTags(){
        return [ ]
    }
    getTag(id: number): Tag|undefined{
        return this.tags.find(tag=>{
            return tag.id===id
        })
    }
    createTag(label: string){ //return promise
        let maxId=0
        if(this.tags)
        {
            this.tags.map(tag=>{
                maxId=Math.max(tag.id, maxId)
            })
        }
        return new Promise((resolve, reject)=>{
            this.dataSvc.createTag(maxId+1, label)
            .subscribe({
                next: async (response)=>{
                    await this.getTags()
                    resolve(maxId+1)
                },
                error: error=>{
                    console.log('could not create tag.')
                    reject(error)
                }
            })
        })
        
    }
}