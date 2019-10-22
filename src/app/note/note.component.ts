import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NoteType } from '../types/note.type';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  @Input() private note: NoteType;
  @Output() private copyNoteToClipboardEvent = new EventEmitter();

  private interval: any;
  private isSideMenuVisible: boolean = false;

  constructor(private noteService: NoteService, private router: Router) { }

  ngOnInit() {
  }

  private fireMouseDownEvent() {

    this.interval = setTimeout(() => {

      this.isSideMenuVisible = true;
    }, 500);
  }

  private fireMouseUpEvent() {
    if (this.interval) {
      clearTimeout(this.interval);
    }
  }

  private async deleteNote() {

    const response: any = await this.noteService.deleteNoteFromDatabase(this.note.noteId);
    console.log(response);

    if (response.status !== 'success') {
      alert('Note could not be deleted!' + response.message);
    }
  }

  private editNote() {
    this.router.navigateByUrl('/notes/edit/' + this.note.noteId);
  }

  private copyNoteToClipboard() {

    this.copyNoteToClipboardEvent.emit(this.note);
  }

  private closeSideMenu() {
    this.isSideMenuVisible = false;
  }
}