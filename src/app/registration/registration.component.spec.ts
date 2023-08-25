import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../shared/material.module';
import { AsyncPipe } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports:[FormsModule, ReactiveFormsModule,MaterialModule,HttpClientModule,AsyncPipe,MatGridListModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        MatDividerModule,
      BrowserAnimationsModule],
      providers:[FormBuilder,HttpClient,MatDialog]
    });
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onRegistrationForm() on  method',()=>{
    
    component.registrationForm.patchValue({
      userTitle:"mr",
      firstName:"shubham",
      lastName:"tile",
      dob:new Date("11/09/1993"),
      phoneNumber:"8788601371", 
      emailId:"shubhamtile@gmail.com",
      password:"test@123",
      gender:"Male",
      nationality:"India",
      address:"New Sangvi",
      city:"Pune",
      state:"Maharashtra", 
      pin:"411027", 
      countryofbirth:"India", 
      countryCode:"+91" 
    });

    component.onRegistrationForm();
    console.log(component.registrationForm.value);
    expect(component.registrationForm.valid).toEqual(true);
    expect(component.registrationFormDetails).toEqual(component.registrationForm.value);
   
  });

  it('should call onResize() on  method',()=>{

    const event= 200;
    // const w = event?.target as Window; 
    // const value = (event.target as Window);
    // event = {
    //   target:{
    //     innerWidth:200
    //   }
    // }
    
    component.onResize(event);
    
    expect(component.matGridCol).toEqual(1);
    expect(component.matGridHeight).toEqual("2:0.5");
  });

  it('should require Invalid', () => {
  
    component.registrationForm.patchValue({
    userTitle:"",
    firstName:"",
    lastName:"",
    dob:"",
    phoneNumber:"", 
    emailId:"",
    password:"",
    gender:"",
    nationality:"",
    address:"",
    city:"",
    state:"", 
    pin:"", 
    countryofbirth:"", 
    countryCode:""
    });
    component.onRegistrationForm();
    // console.log(component.registrationForm.status.toEqual("INVALID"))
    expect(component.registrationForm.valid).toEqual(false);
    expect(component.registrationForm.status.toEqual("INVALID"))
    expect(window.alert).toHaveBeenCalledWith("INVALID");

    
  });

  it('should check hidePassword',()=>{
    expect(component.hidePassword).toEqual(true);
  });
  
});
