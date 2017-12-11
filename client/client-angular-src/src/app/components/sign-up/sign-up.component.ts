import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  email: String;
  password: String;



  constructor(private router: Router,
              private vs: ValidateService,
              private fms: FlashMessagesService,
              private as: AuthService) { }

  ngOnInit() {
  }



  // On sign up
  onSignUp() {

    // User object
    const user = {
      email: this.email,
      password: this.password
    };


    // Validate required fields
    if (!this.vs.validateSignUp(user)) {
      this.fms.show('Please complete all fields.', { cssClass: 'alert-danger' });
      return false;
    }


    // Validate email format
    const email = user.email;

    if (!this.vs.validateEmail(email)) {
      this.fms.show('Invalid email format.', { cssClass: 'alert-danger' });
      console.log('Invalid format');
      return false;
    }


    // Sign up user
    this.as.registerUser(user).subscribe( data => {

      // On successful sign up:
      if (data.success) {

        this.fms.show(data.msg, { cssClass: 'alert-success' });
        this.router.navigate(['/signin']);

      } else {
        // If sign up failed:
        this.fms.show(data.msg, { cssClass: 'alert-danger' });
      }

    });
  }

}
