import { Component, OnDestroy, OnInit } from '@angular/core';
import { Note } from '../shared/note.model';
import { NotesService } from '../shared/notes.service';
import { Tag } from '../shared/tag.model';
import { TagService } from '../shared/tag.service';
import { faThumbTack } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  faThumbTack=faThumbTack
  notes: Note[]=[];
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
  notesSubscription?: Subscription
  tagOptions:Tag[] = [];
  selectedItems:Tag[]  = [];
  dropdownSettings = {};
  constructor(private tagSvc: TagService, private notesSvc: NotesService) { }
  ngOnInit() {
    this.fetchNotes()  
    this.tagOptions = this.tagSvc.getTags()
    this.selectedItems = this.tagSvc.getSelectedTags()
      console.log(this.selectedItems)
    
  }
  fetchNotes(){
    this.notesSubscription= this.notesSvc.getNotes().subscribe({
      next: (responseData:Note[])=>{
              this.notes=responseData
              this.notes.sort((noteA,noteB)=>{
                if(!noteA.isPinned) return 1;
                return -1;
              })
              //this.notes[0].title='abc'
              this.notes.map(note=>{
                console.log(note.title, note.isPinned)
              })
              //return this.notes
            },
      error: error=>{
              console.log('Could not fetch notes: ', error)
              //return this.notes
            }  
      }
    )    
  }
  togglePinnedStatus(note:Note){

    this.notesSvc.togglePinnedStatus(note.id, !note.isPinned)
    .subscribe(
      {
        next: (responseData)=>{
          console.log('Changed pinned status, now fetching again')
          this.fetchNotes()
          
        },
        error: error=>{
          console.log('could not updated pinned status')
        }
      }
    )
    //this.fetchNotes()
    //this.notes[0].title='xyz'
    //console.log(this.notes)
  }

  ngOnDestroy(): void {
    this.notesSubscription?.unsubscribe()
  }
}
