import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
//import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AppRoutingModule } from './app-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ColorPickerModule } from 'ngx-color-picker';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NewNoteComponent } from './notes/new-note/new-note.component';
import { NoteDetailComponent } from './notes/note-detail/note-detail.component';
import { NoteEditComponent } from './notes/note-edit/note-edit.component';
import { TagService } from './shared/tag.service';
import { TagsComponent } from './tags/tags.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ClickedOutsideDirective } from './directives/clicked-outside.directive';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptorService } from './shared/auth-interceptor.service';
import { AuthGuard } from './auth/auth.guard';
import { AlertComponent } from './shared/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NewNoteComponent,
    NoteDetailComponent,
    NoteEditComponent,
    TagsComponent,
    DropdownComponent,
    ClickedOutsideDirective,
    AuthComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,FormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgSelectModule,
    ColorPickerModule,
    HttpClientModule,
    
  ],
  providers: [TagService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  },
  AuthGuard
],
  bootstrap: [AppComponent]
})
export class AppModule { }
