import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";
import { HomeComponent } from "./home/home.component";
import { NewNoteComponent } from "./notes/new-note/new-note.component";
import { NoteDetailComponent } from "./notes/note-detail/note-detail.component";
import { NoteEditComponent } from "./notes/note-edit/note-edit.component";
import { TagsComponent } from "./tags/tags.component";

const appRoutes: Routes=[
    {path: '', component: HomeComponent},
    {path: 'notes/new', component: NewNoteComponent,canActivate:[AuthGuard] },
    {path: 'notes/:id', component: NoteDetailComponent,canActivate:[AuthGuard] },
    {path: 'notes/:id/edit', component: NoteEditComponent,canActivate:[AuthGuard]},
    {path: 'tags', component: TagsComponent, canActivate:[AuthGuard]},
    {path: 'auth', component: AuthComponent}
    
]
@NgModule({
    imports:[RouterModule.forRoot(appRoutes)] ,
    exports:[RouterModule]
})
export class AppRoutingModule{}