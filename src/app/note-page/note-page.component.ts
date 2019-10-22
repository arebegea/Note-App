import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NoteType } from '../types/note.type';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note-page',
  templateUrl: './note-page.component.html',
  styleUrls: ['./note-page.component.scss']
})
export class NotePageComponent implements OnInit {

  subject = new Subject<NoteType>();

  constructor(private router: Router, private noteService: NoteService) { }

  async ngOnInit() {

    const userLogInId = localStorage.getItem('loggedin');

    if (userLogInId) {
      this.noteService.getAllNotesFromDB(userLogInId);
    }
    else {
      this.router.navigateByUrl("/signin");
    }
  }

  copyToClipboard(note) {
    this.subject.next(note);
  }




}