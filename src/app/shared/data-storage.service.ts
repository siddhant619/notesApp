import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Note } from './note.model';
import { Tag } from './tag.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  FIREBASE_URL: string= "https://notes-app-angular-75a00-default-rtdb.firebaseio.com/notes"
  FIREBASE_URL_TAGS: string= "https://notes-app-angular-75a00-default-rtdb.firebaseio.com/tags"
  constructor(private http:HttpClient) { }
  /* fetchNotes(){
    return this.http.get<{[id: string]: Note}>(this.FIREBASE_URL+ ".json",)
  } */
  fetchNotes(){
    return this.http.get<{[id: string]: any}>(this.FIREBASE_URL+ ".json",)
        .pipe( map((data)=>{
          let noteArr=[];
          //console.log('a pipe map ran')
          for(let key in data){
            noteArr.push({...data[key], id:key  })
          }
          return noteArr
          })
        )
        
  }

  storeNote(title: string, content: string, color:string, tags: string[], last_modified: Date, isPinned:boolean ){
    this.http.post(this.FIREBASE_URL+ ".json",
        {
          title,content, color,tags, last_modified, isPinned 
        }
      )
      .subscribe(responseData=>{
        console.log('New note created: ', responseData)
      })
  }

  toggleNotePinnedStatus(noteId:string|undefined, newPinnedStatus: boolean){
    return this.http.patch(this.FIREBASE_URL+ "/"+noteId+  ".json",
      {
        "isPinned": newPinnedStatus
      }    
    )
  }

  updateNote(id:string, title: string, content: string, color: string, last_modified: Date, tags: string[]){
    return this.http.patch(this.FIREBASE_URL+ "/"+id+  ".json",
    {
      title,content,color,last_modified,tags
    })

  }
  updateNoteTags(id: string, tags:string[]){
    
  }
  deleteNote(id: string){
    return this.http.delete(this.FIREBASE_URL+"/"+id+".json")
  }
  fetchTags(){
    return this.http.get(this.FIREBASE_URL_TAGS+".json" )
    .pipe(map((data:any)=>{
      let tagArr:Tag[]=[];
      for(let key in data){
        tagArr.push({...data[key], id:key  })
      }
      return tagArr
      }))
  }
  createTag(text: string){
    return this.http.post(this.FIREBASE_URL_TAGS+".json", {text} )
           
  }
  updateTag(id:string, text: string){
    console.log('updatetag', id, text)
    return this.http.patch(this.FIREBASE_URL_TAGS+ "/"+id+  ".json",
    {
      text
    })
    //'https://notes-app-angular-75a00-default-rtdb.firebaseio.com/tags/-NJtMWlv2PyscG4wm8OT'
  }
  
}
