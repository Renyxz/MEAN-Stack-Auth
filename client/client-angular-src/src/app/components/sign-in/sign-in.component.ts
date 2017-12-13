import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  email: String;
  password: String;

  constructor(private router: Router,
              private vs: ValidateService,
              private as: AuthService,
              private fms: FlashMessagesService) { }

  ngOnInit() {
  }


  // On sign in
  onSignIn() {
    const user = {
      email: this.email,
      password: this.password
    };


    // Validate required fields
    if (!this.vs.validateInput(user)) {
      this.fms.show('Please complete all fields to sign in.', { cssClass: 'alert-danger' });
      return false;
    }


    // Validate email format
    const email = user.email;
    if (!this.vs.validateEmail(email)) {
      this.fms.show('Incorrect email format.', { cssClass: 'alert-danger' });
      return false;
    }

    // Sign in user
    this.as.signInUser(user).subscribe( data => {
      console.log(data);
      // // On successful sign in:
      // if (data) {

      //   this.fms.show(data.msg, { cssClass: 'alert-success' });
      //   this.router.navigate(['/dashboard']);

      // } else {
      //   // If sign in failed:
      //   this.fms.show(data.msg, { cssClass: 'alert-danger' });
      //   return false;
      // }

    });

  }

}
