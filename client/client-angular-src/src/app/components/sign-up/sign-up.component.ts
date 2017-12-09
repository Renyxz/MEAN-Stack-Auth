import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  username: String;
  password: String;



  constructor() { }

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


    // Validate email format


  }

}
