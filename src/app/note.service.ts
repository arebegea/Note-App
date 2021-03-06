import { Injectable } from '@angular/core';
import { NoteType } from './types/note.type';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private dataMappingObject = {

    title: ['Caption', 'Name', 'Headline'],
    body: ['Content', 'Message', 'Description'],
    important: ['checkbox', 'tick'],
    color: ['Background-color', 'Background', 'BgColor'],
    date: ['post-date', 'When'],
    timestamp: ['elapsed-sec'],
    noteId: ['noteUniqueId']
  }

  private _allNotes: NoteType[];

  get allNotes() {
    return this._allNotes;
  }

  //**********************************
  //GET ALL NOTES FROM DB
  //**********************************

  public async getAllNotesFromDB(userLogInId) {

    const currentFormatNotes = await this.getCurrentFormatNotes(userLogInId);
    const archivedNotes = await this.getArchivedNotes(userLogInId);
    this._allNotes = currentFormatNotes.concat(archivedNotes);
    this.sortNoteArray(this._allNotes);

    return this._allNotes;
  }

  //**********************************
  //POST NOTE TO THE DATABASE
  //**********************************

  public async addNoteToDatabase(data, userLogInId) {

    const response = await fetch('http://localhost:3000/notes/' + userLogInId, {
      headers: {
        "Content-Type": "application/json"

      },
      method: 'POST',
      body: JSON.stringify(data)
    });
    const responseJson = await response.json();

    if (responseJson.status == 'success') {

      this._allNotes.push(responseJson.dataFromServer);
      this.sortNoteArray(this._allNotes);
    }

    return responseJson; //should be changed to handle errors
  }

  //**********************************
  //DELETE NOTE FROM THE DATABASE
  //**********************************

  public async deleteNoteFromDatabase(uniqueId) {

    const response = await fetch('http://localhost:3000/notes/' + uniqueId, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      }
    });
    const responseJson = await response.json();

    if (responseJson.status == 'success') {

      const index = this._allNotes.findIndex(x => x.noteId == uniqueId);
      this._allNotes.splice(index, 1);
    }
  }

  //*************************************
  //EDIT NOTE FROM CURRENT DATABASE ENTRY
  //*************************************

  public async editNoteInDatabase(data, userLogInId) {

    const response = await fetch('http://localhost:3000/notes/' + userLogInId, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const responseJson = await response.json();

    if (responseJson.status == 'success') {

      this._allNotes.forEach(x => {
        if (x.noteId == data.noteId) {
          x = data;
        }
      });
      this.sortNoteArray(this._allNotes);
    }

    return responseJson; //should be changed to handle errors
  }

  private sortNoteArray(userNotes) {
    userNotes.sort((a, b) => b.timestamp - a.timestamp);
  }

  //private functions
  private async getCurrentFormatNotes(userLogInId) {

    const response = await fetch('http://localhost:3000/notes/' + userLogInId);
    const dataFromServer = await response.json();

    if (dataFromServer.status == 'success') {
      return dataFromServer.data;
    }
    else {
      console.log(dataFromServer.message)
      return [];
    }
  }
  private async  getArchivedNotes(userLogInId) {

    const response = await fetch('http://localhost:3000/notes/archive/' + userLogInId);
    const dataFromServer = await response.json();

    if (dataFromServer.status == 'success') {
      return dataFromServer.data.map(x => x = this.convertNoteToCurrentFormat(x));
    }
    else {
      console.log(dataFromServer.message)
      return [];
    }
  }

  //This function converts the notes that use different format to the standard/current format
  //A note object is taken as input
  private convertNoteToCurrentFormat(archivedNote) {

    //obtain an array of key for standard format and older format respectively
    const standardKeys = Object.keys(this.dataMappingObject);
    const oldKeys = Object.keys(archivedNote);

    let convertedNote = {};

    oldKeys.forEach(x => {

      //find if archived key is also a standard key
      const isItStandardKey = standardKeys.find(y => y == x);

      //return the standard key that corresponds to the archived key
      const objKey = standardKeys.reduce((acc, curr) => {
        return acc || ((this.dataMappingObject[curr].indexOf(x) >= 0) ? curr : null)
      }, isItStandardKey);

      //if a standard key that corresponds to the archived key was found,
      //insert it into the converted note object
      if (objKey) convertedNote[objKey] = archivedNote[x];
    });

    return convertedNote;
  }

  //Example of a note that uses the old data format
  //
  // const archivedObject = {
  //     Caption: 'Acesta este un alt alt titlu arhivat',
  //     Message: 'Acesta este un alt alt mesaj/body arhivat',
  //     BgColor: '#8fb3d0',
  //     date: 'Acum si mai putin mai putin ffff mult timp',
  //     timestamp: 1268159922000
  // }

}