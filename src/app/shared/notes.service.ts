import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DataStorageService } from './data-storage.service';
import { Note } from './note.model';
import { Tag } from './tag.model';
import { TagService } from './tag.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  /* notes: Note[]=[
    new Note( 'HTML notes', 'some note content afweffef est note content1 afweffeest note content1 afweffeest note content1 afweffe', '#66ccff' , new Date("2021-01-16"),
    [new Tag(2,'CSS'),
    new Tag(3,'Javascirpt'),
    new Tag(4,'C++'),new Tag(5,'Algorithms'),new Tag(6,'Database')], false),
    
    new Note('Angular',  'Test note content1 afweffef','green', new Date("2021-08-16"),
    [new Tag(4,'C++'),
    new Tag(5,'Algorithms'),
    new Tag(6,'Database'),], true),
    
    new Note('Database systems', 'some new content afweffef ome new content afweffe ','purple', new Date("2022-09-23"),
    [new Tag(1,'HTML'), new Tag(2,'CSS'),], true),
    
    new Note('f', '','#ff9933', new Date("2022-09-23"),[], false),
    
    new Note('f', '','', new Date("2022-09-23"),[], true),
    
    new Note('Database systems', 'some new content afweffef ome new content afweffe ','#ff9933', new Date("2022-09-23"),
    [new Tag(1,'HTML'), new Tag(2,'CSS'),], true),


  ] */
  notes:Note[]=[]
  constructor(private tagSvc: TagService, private dataSvc: DataStorageService) { }
  /* getNotes():Observable<Note[]>{
    return this.dataSvc.fetchNotes()
      .pipe( map((data)=>{
        let noteArr:Note[]=[];
        //console.log('a pipe map ran')
        for(let key in data){
          noteArr.push({...data[key], id:key  })
        }
        return noteArr
        })
      )
  } */
  getNotes():Promise<any> { //return a promise
    return new Promise((resolve, reject)=>{
    
        this.dataSvc.fetchNotes()
          .subscribe({
            next: (responseData:Note[])=>{
                    this.notes=responseData
                    this.notes.sort((noteA,noteB)=>{
                      if(!noteA.isPinned) return 1;
                      return -1;
                    })
                    //console.log('fetched notes(in notes svc)!:', this.notes)
                    resolve(this.notes)
                  },
            error: error=>{
                    console.log('Could not fetch notes: ', error)
                    reject(error)
                    //return this.notes
                  }  
            }
          )
      
    })
    
    
  }
  
  createNote(title: string, content: string, color:string, tagIds: number[]){
    const tags:Tag[]=[];
    tagIds.map(tagId=>{
      const tag=this.tagSvc.getTag(tagId) 
      if(tag){
        tags.push(tag)
      }
    })
    const newNote= new Note(title,content,color,new Date(), tags,false );
    //this.notes.push(newNote)
    this.dataSvc.storeNote(newNote);
  }
  togglePinnedStatus(noteId: string|undefined, pinnedStatus: boolean){
    return this.dataSvc.toggleNotePinnedStatus(noteId, pinnedStatus)
  }
}
