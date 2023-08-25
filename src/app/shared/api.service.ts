import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
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
}
