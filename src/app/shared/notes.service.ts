import { Injectable } from '@angular/core';
import { Note } from './note.model';
import { Tag } from './tag.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  notes: Note[]=[
    new Note(1, 'HTML notes', 'some note content afweffef est note content1 afweffeest note content1 afweffeest note content1 afweffe', 'blue' , new Date("2021-01-16"),
    [new Tag(2,'CSS'),
    new Tag(3,'Javascirpt'),
    new Tag(4,'C++'),new Tag(5,'Algorithms'),new Tag(6,'Database')], false),
    new Note(1,'Angular',  'Test note content1 afweffef','green', new Date("2021-08-16"),
    [new Tag(4,'C++'),
    new Tag(5,'Algorithms'),
    new Tag(6,'Database'),], true),
    new Note(1,'Database systems', 'some new content afweffef ome new content afweffe ','purple', new Date("2022-09-23"),
    [new Tag(1,'HTML'), new Tag(2,'CSS'),], true),
    new Note(1,'f', '','purple', new Date("2022-09-23"),[], false),
    new Note(1,'f', '','purple', new Date("2022-09-23"),[], true),
    new Note(1,'Database systems', 'some new content afweffef ome new content afweffe ','purple', new Date("2022-09-23"),
    [new Tag(1,'HTML'), new Tag(2,'CSS'),], true),


  ]
  constructor() { }
  getNotes(){
    this.notes.sort((noteA,noteB)=>{
      if(!noteA.isPinned) return 1;
      return -1;
    })
    return this.notes

  }
}
