import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }



  // Validate input fields required for sign up
  validateSignUp(user) {

    switch (undefined) {
      case user.email:
      case user.password:
        return false;

        default:
          return true;
    }

  }

  // Validate email address
  validateEmail(email) {
    // Regular expression for testing email address
    const reg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    return reg.test(email);
  }


}
