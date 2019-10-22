import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  alertColor: string = "alert";
  alertMessage: string = '';

  usernameFromInput: string = "";
  passwordFromInput: string = "";

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute, private noteService: NoteService) { }

  ngOnInit() {

    if(localStorage.getItem('loggedin')){
      
      this.router.navigateByUrl('/notes');
    }

    let msg: string;
    this.activatedRoute.queryParams.subscribe(params => msg = params['msg']);

    if (msg == 'newacc') {
      this.alertColor = "alert alert-green";
      this.alertMessage = 'You have successfully registered! Now you can log in: ';
    }
    else {
      this.alertColor = "alert";
      this.alertMessage = '';
    }
  }

  async signInUser() {

    this.alertColor = 'alert';
    this.alertMessage = '';

    const userData = {
      username: this.usernameFromInput,
      password: this.passwordFromInput
    }

    console.log(userData);

    if (userData.username && userData.password) {

      const serverResponse = await this.userService.checkUserCredentials(userData);
      console.log('[server response]: ', serverResponse);

      if (serverResponse.status == 'success') {

        localStorage.setItem("loggedin", serverResponse.account);
        this.router.navigateByUrl('/notes');
      }
      else {
        this.alertColor = 'alert alert-red';
        this.alertMessage = serverResponse.message;
      }
    }
    else {
      this.alertColor = 'alert alert-red';
      this.alertMessage = 'Please complete all fields to sign in!';
    }
  }
}
