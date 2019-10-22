import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  userData = {
    username: '',
    email: '',
    telephone: '',
    password: '',
    passwordConfirm: ''
  }

  alertColor: string = 'alert';
  alertMessage: string[] = [''];


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.alertColor = 'alert';
  }

  async createNewUser() {

    console.log(this.userData);
    const formVerfifcation = this.signUpValidation(this.userData);

    if (formVerfifcation.validity) {

      delete this.userData.passwordConfirm;
      console.log(this.userData);

      const serverResponse = await this.userService.registerNewUser(this.userData);
      console.log(serverResponse);

      if (serverResponse.status == 'success') {

        this.alertColor = 'alert alert-green';
        this.alertMessage = serverResponse.message;
        localStorage.setItem('loggedin', '');
        this.router.navigateByUrl("/signin/" + "?msg=newacc");
      }
      else {

        this.alertColor = 'alert alert-red';
        this.alertMessage = [serverResponse.message];
      }
    }
    else {
      this.alertColor = 'alert alert-red';
      console.log(this.alertColor);
      this.alertMessage = [''];

      console.log(formVerfifcation.errors);

      this.alertMessage = formVerfifcation.errors.map(x => x.message);
    }
  }

  private signUpValidation(userData) {
    let signUpErrors = [];
    if (!userData.username || !userData.email || !userData.telephone || !userData.password) {
      signUpErrors.push({ message: 'Please complete all fields to sign up!' });
    }

    if (!this.isUsernameValid(userData.username)) {
      signUpErrors.push({ message: 'Username does not have at least 8 characters or contains invalid characters' });
    }

    if (!this.isEmailValid(userData.email)) {
      signUpErrors.push({ message: 'Invalid e-mail address!' });
    }
    if (!this.isPhoneNumberValid(userData.telephone)) {
      signUpErrors.push({ message: 'Invalid telephone number!' })
    }
    if (userData.password === userData.passwordConfirm) {
      if (!this.isPasswordValid(userData.password)) {
        signUpErrors.push({ message: 'Password must have at least one lowercase letter, one uppercase letter, one number and one special character! ' });
      }
    }
    else {
      signUpErrors.push({ message: 'Passwords introduced do not match' });
    }

    let signUpValidity;
    if (signUpErrors.length === 0) {
      signUpValidity = true;
    }
    else signUpValidity = false;

    return {
      validity: signUpValidity,
      errors: signUpErrors
    }
  }

  private isPhoneNumberValid(telephone) {

    const expression = /^\d+$/;
    return (expression.test(String(telephone)) && telephone.length == 10 && telephone.charAt(0) == '0');
  }

  private isPasswordValid(password) {
    const expression = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,25}$/i;
    return expression.test(String(password));
  }

  private isEmailValid(emailAddress) {

    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return expression.test(String(emailAddress).toLowerCase());
  }

  private isUsernameValid(username) {

    if (username.length >= 8) {

      const expression = /^([\w.-](?!\.(com|net|html?|js|jpe?g|png)$)){5,}$/i;
      return expression.test(String(username).toLowerCase());
    }
    else return false;
  }
}
