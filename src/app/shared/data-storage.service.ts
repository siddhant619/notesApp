import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, tap } from 'rxjs';
import { Note } from './note.model';
import { Tag } from './tag.model';
import { User } from './user.model';

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
  getToken(){
    const str=localStorage.getItem('userData')
    if(typeof(str)==='string'){
      let userData= JSON.parse(str)
      return userData._token;

    }
    return null;
  }
  fetchNotes(){
    return this.http.get<{[id: string]: any}>(this.FIREBASE_URL+ ".json",
    {
      headers:{ 'Anonymous': 'xyz' }
    }
    )
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
    return this.http.post(this.FIREBASE_URL+ ".json",
        {
          title,content, color,tags, last_modified, isPinned 
        }
      )
      
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
  updateNoteTags(notes:{id: string|undefined, tags: string[]}[] ){
    let success = 0;                   // <-- trivial counters
    let errors = 0;

    const reqs = notes.map(note =>  // <-- replate `this.urls` with your object array
      this.http.patch(this.FIREBASE_URL+ "/"+note.id+  ".json",
          {
            tags: note.tags
          }
        ).
          pipe(         // <-- replace `url` with your own PUT request
            tap(_ => success++),           // <-- count successful responses here
            catchError(err => {        
              errors++;                    // <-- count errors here
              return of(err);              // <-- remember to return an observable from `catchError`
            })
          )
        );
        forkJoin(reqs).subscribe({
          next: ()=>{},
          error: err=> console.log(err),
          complete: ()=> console.log(`Success: ${success}\nErrors: ${errors}`)
        })
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
    const token=this.getToken()
    return this.http.patch(this.FIREBASE_URL_TAGS+ "/"+id+  ".json",
    {
      text
    },
    /* {
      params: new HttpParams().set('auth', token)
    } */)
    //'https://notes-app-angular-75a00-default-rtdb.firebaseio.com/tags/-NJtMWlv2PyscG4wm8OT'
  }

  deleteTag(id: string){
    return this.http.delete(this.FIREBASE_URL_TAGS+ "/"+id+  ".json")
  }
  
}
