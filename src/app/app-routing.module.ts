import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NewNoteComponent } from "./notes/new-note/new-note.component";
import { NoteDetailComponent } from "./notes/note-detail/note-detail.component";
import { NoteEditComponent } from "./notes/note-edit/note-edit.component";
import { TagsComponent } from "./tags/tags.component";

const appRoutes: Routes=[
    {path: '', component: HomeComponent},
    {path: 'notes/new', component: NewNoteComponent },
    {path: 'notes/:id', component: NoteDetailComponent },
    {path: 'notes/:id/edit', component: NoteEditComponent},
    {path: 'tags', component: TagsComponent}
    
]
@NgModule({
    imports:[RouterModule.forRoot(appRoutes)] ,
    exports:[RouterModule]
})
export class AppRoutingModule{}