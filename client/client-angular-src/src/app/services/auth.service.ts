import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';



@Injectable()
export class AuthService {

  authToken: any;
  user: any;


  constructor(private http: Http) { }


  // Register user on back-end
  registerUser(user) {
    const headers = new Headers();

    headers.append('Content-type', 'application/json');

    const result = this.http.post('http://localhost:4000/signup', user, { headers: headers });

    return result.map( res => res.json() );
  }

}
