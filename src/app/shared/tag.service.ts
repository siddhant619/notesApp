import { Injectable } from "@angular/core";
import { DataStorageService } from "./data-storage.service";
import { Note } from "./note.model";
import { NotesService } from "./notes.service";
import { Tag } from "./tag.model";

@Injectable({
    providedIn: 'root'
  })
export class TagService{
    private tags: Tag[]=[
    ]
    constructor( private dataSvc: DataStorageService) { 
      
     }

    async getTags(): Promise<any>{
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
    getTag(id: string): Tag|undefined{
        return this.tags.find(tag=>{
            return tag.id===id
        })
    }
    createTag(label: string){ //return promise
        return new Promise((resolve, reject)=>{
            this.dataSvc.createTag(label)
            .subscribe({
                next: async (response)=>{
                    console.log('created new tag', response)
                    await this.getTags()
                    resolve(response)
                },
                error: error=>{
                    console.log('could not create tag.')
                    reject(error)
                }
            })
        })
        
    }
    updateTag(id:string, label: string){
        return new Promise((resolve, reject)=>{
            this.dataSvc.updateTag(id, label)
            .subscribe({
                next: async (response)=>{
                    //console.log('Updated tag', response)
                    await this.getTags()
                    resolve(id)
                },
                error: error=>{
                    console.log('could not update tag.', error)
                    reject(error)
                }
            })
        })
    }
    deleteTag(id: string){        

        return new Promise((resolve, reject)=>{
            this.dataSvc.deleteTag(id)
            .subscribe({
                next: (response)=>{
                    resolve(id);
                },
                error: error=>{
                    console.log('could not delete tag.', error)
                    reject(error)
                }

            })
        })
        
    }
    
}