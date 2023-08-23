import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  registrationForm:any = FormGroup;
  isCardDisplay:boolean=false;
  hidePassword:boolean = true;
  stateResult:any;
  countryResult:any;
  registrationFormDetails:any;
  stateFilteredOptions:any = Observable<string[]>;
  options: any = ['One', 'Two', 'Three'];
  myControl = new FormControl('');
  matGridCol: any;
  matGridHeight:any;
  constructor(private fb: FormBuilder, public http: HttpClient){
    this.http.get('assets/json/state.json').subscribe((res) => {
      this.stateResult = res;
      console.log(this.stateResult);
  
    });

    this.http.get('assets/json/country.json').subscribe((res) => {
      this.countryResult = res;
    });
  }

  ngOnInit (): void {
    
    this.matGridCol = (window.innerWidth <= 500) ? 1 : 3;
    this.matGridHeight = (window.innerWidth <= 500) ? "2:0.5" : "3:0.5";

    this.registrationForm = this.fb.group ({
      userTitle : new FormControl(''),
      firstName : new FormControl('', [Validators.required]),
      lastName : new FormControl('', [Validators.required]),
      dob : new FormControl('', [Validators.required]),
      phoneNumber : new FormControl('', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]),
      emailId : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required]),
      gender : new FormControl(''),
      nationality : new FormControl(''),
      address : new FormControl('', [Validators.required]),
      city : new FormControl('', [Validators.required]),
      state : new FormControl(''),
      pin : new FormControl(''),
      countryofbirth : new FormControl('', [Validators.required]),
      countryCode:new FormControl(''),
    });

    

    this.stateFilteredOptions = this.myControl.valueChanges.pipe(startWith(''),map(value => this._filter(value || '')),);
    console.log( this.stateFilteredOptions);

  }

  getErrorMessage() {
    if (this.registrationForm.get("emailId").hasError('required')) {
      return 'You must enter a email id';
    }
    return this.registrationForm.get("emailId").hasError('email') ? 'Not a valid email' : '';
  }

  onBookChange(event:any){
    this.isCardDisplay = (event.value == 'addCardY') ?  true : false;
    console.log(this.isCardDisplay); 
  }

  onRegistrationForm(value:any){
    if(this.registrationForm.hasError){
      console.log(this.registrationForm);
      alert("All fields are required");
    }else{
      this.registrationFormDetails = this.registrationForm.value; 
      console.log(this.registrationFormDetails);
    }

  }

  onResize(event:any){
    this.matGridCol = (event.target.innerWidth <= 500) ? 1 : 3;
    this.matGridHeight = (window.innerWidth <= 500) ? "2:0.5" : "3:0.5";
  }

  private _filter(value: any): any {
    const filterValue = value;
    console.log(filterValue);
    this.http.get('assets/json/state.json').subscribe((res) => {
      this.stateResult = res;
      const result = this.stateResult.map((item:any) => item['label']);
      console.log(result);
      return this.options.filter((option:any) => option.toLowerCase().includes(filterValue));
    });
  
  }


}
