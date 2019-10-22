import { Component, OnInit } from '@angular/core';
import { FormNoteType, NoteType } from '../../types/note.type'
import { NoteService } from 'src/app/note.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  private editNoteData: FormNoteType = {
    title: '',
    body: '',
    important: false,
    color: '#ffffff'
  }
  private routeSub: Subscription;
  private editId: string;

  constructor(private noteService: NoteService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    if (this.noteService.allNotes) {
      this.routeSub = this.route.params.subscribe(params => { this.editId = params['id'] });
      this.editNoteData = this.noteService.allNotes.find(x => x.noteId == this.editId);
    }
    else this.router.navigateByUrl('/notes');
  }

  async saveEditedNote() {

    const userLogInId = localStorage.getItem('loggedin');

    if (userLogInId) {

      const dataEdited:NoteType = this.editNoteData;
      dataEdited.noteId = this.editId;
      dataEdited.timestamp = Date.now();
      
      const response = await this.noteService.editNoteInDatabase(dataEdited, userLogInId);

      if(response.status == 'success'){

        this.router.navigateByUrl('/notes');
      }
      else alert('Note could not be edited! ' + response.message);
    }
    else this.router.navigateByUrl("/");
  }

  cancelEdit() {
    this.router.navigateByUrl('/notes');
  }

  resetFormFields() {
    this.editNoteData = {
      title: '',
      body: '',
      important: false,
      color: '#ffffff'
    }
  }
}
