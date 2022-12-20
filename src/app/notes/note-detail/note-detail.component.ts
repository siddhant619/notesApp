import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit {
  id: string=''
  currentNote: Note={id:'', title:'', content:'', isPinned:false, tags:[], color:'',last_modified:new Date}
  constructor(private router: Router, private route: ActivatedRoute, private notesSvc: NotesService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(async (params)=>{
        this.id= params['id'] 
        this.currentNote= await this.notesSvc.getNote(this.id)
        //console.log(this.currentNote)
      })
  }
  onDelete(){
    this.notesSvc.deleteNote(this.currentNote.id)
     .subscribe(responseData=>{

      console.log('deleted note')
      this.router.navigate(["/"])
     })

  }
}
