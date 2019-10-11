import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { UserService } from '../user.service';
import { NoteService } from '../note.service';
import { NoteType, NewNoteType } from '../types/note.type'

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss']
})

export class NewNoteComponent implements OnInit {

  @Output() saveNewNoteEvent = new EventEmitter();


  newNoteData: NewNoteType = {
    title: '',
    body: '',
    important: false,
    color: '#ffffff'
  }

  constructor(private userService: UserService, private noteService: NoteService) { }

  async ngOnInit() {
  }

  async saveNewNote() {

    const userLogInId = localStorage.getItem('loggedin');

    if (userLogInId) {

      const dataSaved:NoteType = this.newNoteData;
      dataSaved.timestamp = Date.now();
      console.log('data to be saved', dataSaved.timestamp);

      const response = await this.noteService.addNoteToDatabase(dataSaved, userLogInId);

      if (response.status == 'success') {

        // this.allNotes.push(dataSaved);
        //add note at the array in parent

        this.saveNewNoteEvent.emit(dataSaved);
      }

      else {
        alert('Note could not be added to the database: ' + response.message);
      }
      this.resetFormFields();
    }
    else window.location.replace("http://localhost:4200/");
  }

  async logOut() {

    const loggedUserId = localStorage.getItem('loggedin');

    const serverResponse = await this.userService.deleteLogInFromDB(loggedUserId);

    if (serverResponse.status == 'success') {

      localStorage.removeItem('loggedin');
      window.location.replace("http://localhost:4200/signin");
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
}