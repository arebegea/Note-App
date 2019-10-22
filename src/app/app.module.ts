import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NewNoteComponent } from './new-note/new-note.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { NotePageComponent } from './note-page/note-page.component';
import { UserNotesComponent } from './user-notes/user-notes.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NoteComponent } from './note/note.component';
import { NoteMenuComponent } from './note-menu/note-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    NewNoteComponent,
    SigninComponent,
    SignupComponent,
    NotePageComponent,
    UserNotesComponent,
    HomePageComponent,
    NoteComponent,
    NoteMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
 