import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-note-menu',
  templateUrl: './note-menu.component.html',
  styleUrls: ['./note-menu.component.scss']
})
export class NoteMenuComponent implements OnInit {

  @Output() deleteNoteEvent = new EventEmitter();
  @Output() editNoteEvent = new EventEmitter();
  @Output() copyNoteToClipboardEvent = new EventEmitter();
  @Output() closesideMenuEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  deleteNote(){
    this.deleteNoteEvent.emit();
  }
  editNote(){
    this.editNoteEvent.emit();
  }
  copyNoteToClipboard(){
    this.copyNoteToClipboardEvent.emit();
  }
  closeSideMenu(){
    this.closesideMenuEvent.emit();
  }

}
