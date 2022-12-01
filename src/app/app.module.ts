import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NewNoteComponent } from './notes/new-note/new-note.component';
import { NoteDetailComponent } from './notes/note-detail/note-detail.component';
import { NoteEditComponent } from './notes/note-edit/note-edit.component';
import { TagsComponent } from './tags/tags.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NewNoteComponent,
    NoteDetailComponent,
    NoteEditComponent,
    TagsComponent
  ],
  imports: [
    BrowserModule,FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
