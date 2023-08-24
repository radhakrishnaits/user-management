import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
  constructor(private fb: FormBuilder, public http: HttpClient) {
    this.http.get('assets/json/state.json').subscribe((res) => {
      this.stateResult = res;
      //console.log(this.stateResult);
    });

    this.http.get('assets/json/country.json').subscribe((res) => {
      this.countryResult = res;
    });
  }

  ngOnInit(): void {

    this.matGridCol = (window.innerWidth <= 500) ? 1 : 3;
    this.matGridHeight = (window.innerWidth <= 800) ? "2:0.5" : "3:0.5";
    // this.matGridHeight = (window.innerWidth <= 800 && window.innerWidth >= 600) ? ((window.innerWidth <= 600)? "1:0.5" :"2:0.5)") : "3:0.5";

    this.registrationForm = this.fb.group({
      userTitle: new FormControl(''),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]),
      emailId: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      gender: new FormControl(''),
      nationality: new FormControl(''),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl(''),
      pin: new FormControl(''),
      countryofbirth: new FormControl('', [Validators.required]),
      countryCode: new FormControl(''),
    });

    // this.stateFilteredOptions = this.myControl.valueChanges.pipe(startWith(''),map(value => this._filter(value || '')),);
    // console.log( this.stateFilteredOptions);

  }

  onRegistrationForm() {
    console.log(this.registrationForm.status);
    if (this.registrationForm.status == "INVALID") {
      alert("All fields are required");
    } else {
      this.registrationFormDetails = this.registrationForm.value;
      //console.log(JSON.stringify(this.registrationFormDetails));
    }
  }

  onResize(event: any) {
    const w = event.target as Window;
    console.log(w.innerWidth)
    this.matGridCol = (event.target.innerWidth <= 500) ? 1 : 3;
    this.matGridHeight = (window.innerWidth <= 800) ? "2:0.5" : "3:0.5";
    // this.matGridHeight = (window.innerWidth <= 800 && window.innerWidth >= 600) ? ((window.innerWidth <= 600)? "1:0.5" :"2:0.5)") : "3:0.5";
  }

  // onBookChange(event: any) {
  //   this.isCardDisplay = (event.value == 'addCardY') ? true : false;
  //   console.log(this.isCardDisplay);
  // }

  // onEditUser(form: any) {
  //   console.log(form);
  //   this.http.get('assets/json/test.json').subscribe((res) => {

  //     // this.registrationForm.valueChanges = res;
  //     this.registrationForm.patchValue(res);
  //     // this

  //   });
  // }


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
