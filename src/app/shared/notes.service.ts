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
  tags:Tag[]=[]
  constructor(private tagSvc: TagService, private dataSvc: DataStorageService) { }
  
  async getNotes():Promise<any> { //return a promise
    //console.log('fetching notes from db')
    this.tags = await this.tagSvc.getTags()
    return new Promise((resolve, reject)=>{
    
        this.dataSvc.fetchNotes()
          .subscribe({
            next: (responseData)=>{
                    this.notes=[]
                    for(let data of responseData){
                      let tagIds=data.tags
                      data.tags=[]
                      if(tagIds){
                        for(let tagId of tagIds){
                          data.tags.push(this.tagSvc.getTag(tagId))
                        }
                      }
                      this.notes.push(data);
                    }
                    this.notes.sort((noteA,noteB)=>{
                      if(!noteA.isPinned) return 1;
                      return -1;
                    })
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
  async getNote(id: string):Promise<any>{
    if(this.notes.length===0) //need to fetch notes(when notes detail/edit page is refreshed)
    {
      await this.getNotes();
    }
    let note:any;
    for(let currNote of this.notes){
      if(currNote.id===id) note=currNote
    }
    return note
    
  }
  createNote(title: string, content: string, color:string, tagIds: string[]){
    this.dataSvc.storeNote(title, content, color,tagIds, new Date(), false)
  }
  togglePinnedStatus(noteId: string|undefined, pinnedStatus: boolean){
    return this.dataSvc.toggleNotePinnedStatus(noteId, pinnedStatus)
  }

  updateNote(id:any, title: string, content: string, color: string, date: Date, tagIds: string[]){
    
    return this.dataSvc.updateNote(id, title,content,color,date,tagIds)
  }

  deleteNote(id: any){
    return this.dataSvc.deleteNote(id)
  }

  updateNotesTag(id: string){
    this.notes.map(note=>{
      note.tags=note.tags.filter(tag=>{
          if(tag.id===id) return false;
          return true;
      })
  })
  console.log('after removing tag', this.notes);
  }

}
