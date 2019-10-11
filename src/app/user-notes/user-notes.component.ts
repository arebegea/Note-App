import { Component, OnInit, Input, Output } from '@angular/core';
import { UserService } from '../user.service';
import { NoteService } from '../note.service';


@Component({
  selector: 'app-user-notes',
  templateUrl: './user-notes.component.html',
  styleUrls: ['./user-notes.component.scss']
})
export class UserNotesComponent implements OnInit {

  // @Output onDelete: EventEmitter = new 

  @Input() allNotes;

  constructor() { }

  async ngOnInit() {
  }


  // onDeleteClick(id:string){
  //   this.onDelete.emit(id)
  // }
}
