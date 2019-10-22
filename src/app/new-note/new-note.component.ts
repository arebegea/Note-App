import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { UserService } from '../user.service';
import { NoteService } from '../note.service';
import { NoteType, FormNoteType } from '../types/note.type'
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss']
})

export class NewNoteComponent implements OnInit {

  @Output() saveNewNoteEvent = new EventEmitter();
  @Input() private notePageSubject;

  newNoteData: FormNoteType = {
    title: '',
    body: '',
    important: false,
    color: '#ffffff'
  }
  
  constructor(private userService: UserService, private noteService: NoteService, private router: Router) { }

  async ngOnInit() {
    this.notePageSubject.subscribe(copiedNote => {
      this.newNoteData.title = copiedNote.title;
      this.newNoteData.body = copiedNote.body;
      this.newNoteData.important = copiedNote.important;
      this.newNoteData.color = copiedNote.color;
    });
  }

  async saveNewNote() {

    const userLogInId = localStorage.getItem('loggedin');

    if (userLogInId) {

      const dataSaved:NoteType = this.newNoteData;
      dataSaved.timestamp = Date.now();
      

      const response = await this.noteService.addNoteToDatabase(dataSaved, userLogInId);
      console.log('response from server ', response);

      if (response.status == 'success') {

        this.saveNewNoteEvent.emit();
      }

      else {
        alert('Note could not be added to the database: ' + response.message);
      }
      this.resetFormFields();
    }
    else this.router.navigateByUrl("/signin");
  }

  async logOut() {

    const loggedUserId = localStorage.getItem('loggedin');

    const serverResponse = await this.userService.deleteLogInFromDB(loggedUserId);

    if (serverResponse.status == 'success') {

      localStorage.removeItem('loggedin');
      this.router.navigateByUrl("/signin");
    }
    else {
      alert('Log out failed! ' + serverResponse.message);
    }
  }
  
  resetFormFields(){
    this.newNoteData = {
      title: '',
      body: '',
      important: false,
      color: '#ffffff'
    }
  }



  // const ev: EventEmitter = new EventEmitter()

  // function notecopiedtoCli(note:Notge){
  //   this.ev.emit(note);
  // }

  // ev


}