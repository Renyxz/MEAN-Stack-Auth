import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../services/validate.service';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  username: String;
  password: String;



  constructor(private vs: ValidateService,
              private fms: FlashMessagesService) { }

  ngOnInit() {
  }



  // On sign up
  onSignUp() {

    // User object
    const user = {
      username: this.username,
      password: this.password
    };


    // Validate required fields
    if (!this.vs.validateSignUp(user)) {
      this.fms.show('Please complete all fields.', { cssClass: 'alert-danger' });
      return false;
    }


    // Validate email format
    const email = user.username;

    if (!this.vs.validateEmail(email)) {
      this.fms.show('Invalid email format.', { cssClass: 'alert-danger' });
      console.log('Invalid format');
      return false;
    }

  }

}
