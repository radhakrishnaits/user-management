import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import {SessionStorageService} from "../../shared/session-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: any = FormGroup;
  loginFormDetails:any;
  isLogin:boolean = false;
  constructor(private fb: FormBuilder, public apiService: ApiService, public route: Router, public serviceSession: SessionStorageService){}

  ngOnInit(): void {
    /**
     *@ ROHIT SAVAJ
     * Redirect to user profile if logged in.
     * @return the Redirect to user profile
     */
    if (sessionStorage.getItem("email")) {
      this.isLogin = true
    }
    if(this.isLogin) {
      this.route.navigateByUrl('/user-profile')
    }
    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onLoginUser(){
    this.loginFormDetails = this.loginForm.value;
    console.log(JSON.stringify(this.loginFormDetails));
    this.apiService.onSignInUser(this.loginFormDetails).subscribe((res:any)=>{
        alert(res["message"]?.description);
        this.loginForm.reset();
        //this.route.navigateByUrl('/user-profile');
      /**
       *@ ROHIT SAVAJ
       * store email,firstName,lastName in session storage after login.
       * @return the Redirect to user profile
       */
        this.serviceSession.setItem('email',res["userName"])
        this.serviceSession.setItem('firstName',res["firstName"])
        this.serviceSession.setItem('lastName',res["lastName"])
        /*sessionStorage.setItem('email',res["userName"])
        sessionStorage.setItem('firstName',res["firstName"])
        sessionStorage.setItem('lastName',res["lastName"])*/
        this.route.navigateByUrl('/user-profile').then(() => {
          window.location.reload();
        });
    },error=>{
        alert(error?.error?.message?.description);
    });
  }

}
