import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  FIREBASE_URL: string= "https://notes-app-angular-75a00-default-rtdb.firebaseio.com/notes"
  constructor(private http:HttpClient) { }
  fetchNotes(){
    return this.http.get<{[id: string]: Note}>(this.FIREBASE_URL+ ".json",
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
}
