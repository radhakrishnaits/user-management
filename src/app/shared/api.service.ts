import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, retry} from 'rxjs/operators';
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl:string = environment.apiUrl
  constructor(
    private http: HttpClient
  ) { }
  /**
   *@ ROHIT SAVAJ
   * User view/modify.
   * @return the User view/modify
   */
  getProfile(email:string) {
    return this.http.get(this.apiUrl + 'users/' + email)
  }
  updateProfile(requestBody:any,email:string) {
    return this.http.put(this.apiUrl + 'users/'+email, requestBody)
  }
  getUserCard(cardNumber:number,email:string) {
    return this.http.get(this.apiUrl + 'users/' + email + '/cards')
  }
  addUserCard(requestBody:any,email:string) {
    return this.http.post(this.apiUrl + 'users/' + email + '/cards',requestBody)
  }
  deleteUserCard(email:string,cardNumber:number) {
    return this.http.delete(this.apiUrl + 'users/' + email + '/cards/' + cardNumber)
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
