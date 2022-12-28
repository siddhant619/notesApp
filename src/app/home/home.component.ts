import { Component, OnDestroy, OnInit } from '@angular/core';
import { Note } from '../shared/note.model';
import { NotesService } from '../shared/notes.service';
import { Tag } from '../shared/tag.model';
import { TagService } from '../shared/tag.service';
import { faThumbTack,faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  faThumbTack=faThumbTack
  faNoteSticky=faNoteSticky
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
  constructor(private tagSvc: TagService, private notesSvc: NotesService,
    private router: Router) { }
  async ngOnInit() {
    this.tagOptions = await this.tagSvc.getTags()
    this.notes= await this.notesSvc.getNotes();

    
  }
  
  togglePinnedStatus(e:Event, note:Note){
    e.stopPropagation()
    this.notesSvc.togglePinnedStatus(note.id, !note.isPinned)
    .subscribe(
      {
        next: async (responseData)=>{
          this.notes= await this.notesSvc.getNotes();
        },
        error: error=>{
          console.log('could not updated pinned status')
        }
      }
    )
    
  }
  onNoteClicked(id: string|undefined) {
    if(id)
      this.router.navigate(['/notes',id])
  }
  ngOnDestroy(): void {
    this.notesSubscription?.unsubscribe()
  }
}