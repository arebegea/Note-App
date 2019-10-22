import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-user-notes',
  templateUrl: './user-notes.component.html',
  styleUrls: ['./user-notes.component.scss']
})
export class UserNotesComponent implements OnInit {

  @Output() private copyNoteToClipboardEvent = new EventEmitter();

  constructor(private noteService: NoteService) { }

  // @Input() private allNotes;


   get allNotes() {
    return this.noteService.allNotes;
  }

  copyToClipboard(note) {
    this.copyNoteToClipboardEvent.emit(note);
  }

  async ngOnInit() {
  }
}
