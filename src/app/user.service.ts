import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //***************
  //SIGN IN USER
  //***************
  async checkUserCredentials(userData) {

    console.log(JSON.stringify(userData));

    const response = await fetch('http://localhost:3000/accounts/signin', {
      headers: {
        "Content-Type": "application/json"

      },
      method: 'POST',
      body: JSON.stringify(userData)
    });

    return response.json(); //should be changed to handle errors
  }

  //***************
  //SIGN UP USER
  //***************
  async registerNewUser(userData) {

    const response = await fetch('http://localhost:3000/accounts/signup', {
      headers: {
        "Content-Type": "application/json"

      },
      method: 'POST',
      body: JSON.stringify(userData)
    });

    return response.json(); //should be changed to handle errors
  }

  // //*************************************
  // //Delete Log In ID from Database
  // //*************************************

  async deleteLogInFromDB(uniqueId) {

    const response = await fetch('http://localhost:3000/accounts/signout/' + uniqueId, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.json(); //should be changed to handle errors
  }
}