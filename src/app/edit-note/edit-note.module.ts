import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EditNoteRoutingModule } from './edit-note-routing.module';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    EditNoteRoutingModule,
    FormsModule
  ]
})
export class EditNoteModule { }
