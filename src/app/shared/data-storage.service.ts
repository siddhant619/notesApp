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
  constructor(private http:HttpClient) { }
  /* fetchNotes(){
    return this.http.get<{[id: string]: Note}>(this.FIREBASE_URL+ ".json",)
  } */
  fetchNotes(){
    return this.http.get<{[id: string]: Note}>(this.FIREBASE_URL+ ".json",)
        .pipe( map((data)=>{
          let noteArr:Note[]=[];
          //console.log('a pipe map ran')
          for(let key in data){
            noteArr.push({...data[key], id:key  })
          }
          return noteArr
          })
        )
        
  }

  storeNote(note: Note){
    this.http.post(this.FIREBASE_URL+ ".json",
      note).subscribe(responseData=>{
        console.log('note pushed: ', responseData)
      })
  }

  toggleNotePinnedStatus(noteId:string|undefined, newPinnedStatus: boolean){
    return this.http.patch(this.FIREBASE_URL+ "/"+noteId+  ".json",
      {
        "isPinned": newPinnedStatus
      }    
    )
  }

  updateNote(id:string, title: string, content: string, color: string, last_modified: Date, tags: Tag[]){
    return this.http.patch(this.FIREBASE_URL+ "/"+id+  ".json",
    {
      title,content,color,last_modified,tags
    })

  }
  deleteNote(id: string){
    return this.http.delete(this.FIREBASE_URL+"/"+id+".json")
  }
}
