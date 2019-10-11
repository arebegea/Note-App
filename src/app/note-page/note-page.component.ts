import { Component, OnInit } from '@angular/core';
import { NoteType } from '../types/note.type';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note-page',
  templateUrl: './note-page.component.html',
  styleUrls: ['./note-page.component.scss']
})
export class NotePageComponent implements OnInit {

  userNotes: NoteType[];

  constructor(private noteService: NoteService) { }

  async ngOnInit() {

    const userLogInId = localStorage.getItem('loggedin');

    if(userLogInId){
      
    this.userNotes = await this.noteService.getAllNotedFromDB(userLogInId);
    this.sortNoteArray(this.userNotes)

    console.log(this.userNotes);
    }
    else window.location.replace("http://localhost:4200/signin");
  }


  newNoteAdded(savedNote){

    this.userNotes.push(savedNote);
    this.sortNoteArray(this.userNotes);
  }

  private sortNoteArray(userNotes){
    userNotes.sort( (a, b) => b.timestamp - a.timestamp);
  }

  // onNodeDelete(id:string) {
  //   // push la server
  //   // ok > delete from localArray
  // }

}
