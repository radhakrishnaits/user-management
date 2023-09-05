import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';
// import { SnackBarService } from '../shared/services/snack-bar.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  registrationForm: any = FormGroup;
  // isCardDisplay: boolean = false;
  hidePassword: boolean = true;
  stateResult: any;
  countryResult: any;
  registrationFormDetails: any;
  matGridCol: any;
  matGridHeight: any;
  todayDate:Date = new Date();
  constructor(private fb: FormBuilder, public http: HttpClient, public apiService: ApiService, public route:Router) {
    this.fetchStateData();
    this.fetchCountryData();
  }

  fetchStateData(){
    this.apiService.getStateData().subscribe((res) => {
      this.stateResult = res;
    });
  }

  fetchCountryData(){
    this.apiService.getCountryData().subscribe((res) => {
      this.countryResult = res;
    });
  }

  ngOnInit(): void {

    this.matGridCol = (window.innerWidth <= 500) ? 1 : 3;
    this.matGridHeight = (window.innerWidth <= 800) ? "2:0.5" : "3:0.5";
    // this.matGridHeight = (window.innerWidth <= 800 && window.innerWidth >= 600) ? ((window.innerWidth <= 600)? "1:0.5" :"2:0.5)") : "3:0.5";

    this.registrationForm = this.fb.group({
      userTitle: new FormControl(''),
      firstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]),
      dob: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      gender: new FormControl(''),
      nationality: new FormControl(''),
      address1: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]),
      state: new FormControl(''),
      pin: new FormControl('', [Validators.pattern('^[0-9]*$')]),
      countryBirth: new FormControl('', [Validators.required]),
      country: new FormControl(''),
      wishToAddCard:"N"
    });

    // this.stateFilteredOptions = this.myControl.valueChanges.pipe(startWith(''),map(value => this._filter(value || '')),);
    // console.log( this.stateFilteredOptions);

  }

  onRegistrationForm() {
    if (this.registrationForm.status == "INVALID") {
      alert("All fields are required");
    } else {
      this.registrationFormDetails = this.registrationForm.value;
      // console.log(JSON.stringify(this.registrationFormDetails));
      this.apiService.onSignUpUser(this.registrationFormDetails).subscribe((res:any)=>{
          if(res?.message?.code == 200){
            alert(res["message"]?.description);
            this.registrationForm.reset();
            this.route.navigate(['']);
          }else{
            alert(res["message"]?.description);
          }
      },error=>{
        alert(error?.message);
      });
    }
  }

  onResize(event: any) {
    const w = event.target as Window;
    console.log(event);
    this.matGridCol = (w.innerWidth <= 500) ? 1 : 3;
    this.matGridHeight = (w.innerWidth <= 800) ? "2:0.5" : "3:0.5";
    // this.matGridHeight = (window.innerWidth <= 800 && window.innerWidth >= 600) ? ((window.innerWidth <= 600)? "1:0.5" :"2:0.5)") : "3:0.5";
  }
  

  // private _filter(value: any): any {
  //   const filterValue = value;
  //   console.log(filterValue);
  //   this.http.get('assets/json/state.json').subscribe((res) => {
  //     this.stateResult = res;
  //     const result = this.stateResult.map((item:any) => item['label']);
  //     console.log(result);
  //     return this.options.filter((option:any) => option.toLowerCase().includes(filterValue));
  //   });

  // }


}
