import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: any = FormGroup;
  loginFormDetails:any;
  constructor(private fb: FormBuilder, public apiService: ApiService, public route: Router){}

  ngOnInit(): void {
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
        sessionStorage.setItem('email',res["userName"])
        sessionStorage.setItem('firstName',res["firstName"])
        sessionStorage.setItem('lastName',res["lastName"])
        this.route.navigateByUrl('/user-profile').then(() => {
          window.location.reload();
        });
    },error=>{
        alert(error?.error?.message?.description);
    });
  }

}
