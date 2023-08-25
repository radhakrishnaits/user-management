import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl:string = environment.apiUrl
  constructor(
    private http: HttpClient
  ) { }
  getProfile(email:string) {
    return this.http.get(this.apiUrl + 'users/' + email)
  }

  /** 
   *@ SHUBHAM TILE 
   * Register users.
	 * @return the user
  */
 
  onSignUpUser(requestBody:any){
    let options = { 
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
    };
    return this.http.post(this.apiUrl + 'signup', requestBody, options);
  }

   /** 
   *@ SHUBHAM TILE 
   * Login users.
	 * @return the authentication response
  */
  onSignInUser(requestBody:any){
    let options = { 
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
    };
    return this.http.post(this.apiUrl + 'signin', requestBody, options);
  }
  
}
