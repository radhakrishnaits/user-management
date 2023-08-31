import { ComponentFixture, TestBed, tick, fakeAsync  } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { RegistrationComponent } from './registration.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { MaterialModule } from '../shared/material.module';
import { AsyncPipe, CommonModule } from '@angular/common';
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
import { ApiService } from '../shared/api.service';
import { ReceiversModule } from '../receivers/receivers.module';
import { async, of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../login/login/login.component';
import { Router } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { ProfileComponent } from '../user/profile/profile.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let baseUrl = "http://localhost:8080/user-management/v1/signup";
  let apiService: ApiService; // Replace with the actual service
  let mockApiService: jasmine.SpyObj<ApiService>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports:[HttpClientTestingModule, FormsModule, ReactiveFormsModule,MaterialModule,HttpClientModule,
        AsyncPipe,MatGridListModule,MatSelectModule,MatInputModule,MatFormFieldModule,MatDatepickerModule,
        MatNativeDateModule,MatRadioModule,MatDividerModule,AppRoutingModule,CommonModule,
        BrowserAnimationsModule, RouterTestingModule.withRoutes([{path: '', 
        component: LoginComponent}])],
      providers:[FormBuilder,MatDialog,ApiService]
    }).compileComponents();
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockApiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set matGridCol and matGridHeight based on window width', () => {
    const mockEvent = {
      target: {
        innerWidth: 700
      }
    };


    component.onResize(mockEvent);

  expect(component.matGridCol).toBe(3);
    expect(component.matGridHeight).toBe('2:0.5');
  });

  it('should require Invalid', () => {
  
    component.registrationForm.patchValue({
      userTitle:"",
      firstName:"",
      lastName:"",
      dob:"",
      phoneNumber:"", 
      email:"",
      password:"",
      gender:"",
      nationality:"",
      address1:"",
      city:"",
      state:"", 
      pin:"", 
      countryBirth:"", 
      country:"",
      wishToAddCard:""
    });
    component.onRegistrationForm();
    expect(component.registrationForm.valid).toEqual(false);
  });

  it('should check hidePassword',()=>{
    expect(component.hidePassword).toEqual(true);
  });

  it('should show alert for invalid form', () => {
    spyOn(window, 'alert');

    component.registrationForm.setValue({
      userTitle:"",
      firstName:"",
      lastName:"",
      dob:"",
      phoneNumber:"", 
      email:"",
      password:"",
      gender:"",
      nationality:"",
      address1:"",
      city:"",
      state:"", 
      pin:"", 
      countryBirth:"", 
      country:"",
      wishToAddCard:""
    });
    component.onRegistrationForm();

    expect(window.alert).toHaveBeenCalledWith('All fields are required');
  });

  it('should handle successful registration response', () => {
    spyOn(apiService, 'onSignUpUser').and.returnValue(of({ message: { code: 200, description: 'Registration successful' } }));
    spyOn(component.registrationForm, 'reset');
    spyOn(component.route, 'navigate');

    component.registrationForm.setValue({
      userTitle:"mr",
      firstName:"shubham",
      lastName:"tile",
      dob:new Date("11/09/1993"),
      phoneNumber:"8788601371", 
      email:"shubhamtile@gmail.com",
      password:"test@123",
      gender:"Male",
      nationality:"India",
      address1:"New Sangvi",
      city:"Pune",
      state:"Maharashtra", 
      pin:"411027", 
      countryBirth:"India", 
      country:"+91",
      wishToAddCard:"N" 
    });
    component.onRegistrationForm();

    expect(window.alert).toBe('Registration successful');
    // expect(window.alert).toHaveBeenCalledWith('Registration successful');
    expect(component.registrationForm.reset).toHaveBeenCalled();
    expect(component.route.navigate).toHaveBeenCalledWith(['']);
  });

  it('should handle error during registration', () => {
    const errorMessage =  { code: 500, description: 'Registration unsuccessful' };
    spyOn(apiService, 'onSignUpUser').and.returnValue(throwError({ message: { code: 500, description: 'Registration unsuccessful' } }));
    spyOn(window, 'alert');

    component.registrationForm.setValue({
      userTitle:"mr",
      firstName:"shubham",
      lastName:"tile",
      dob:new Date("11/09/1993"),
      phoneNumber:"8788601371", 
      email:"shubhamtile@gmail.com",
      password:"test@123",
      gender:"Male",
      nationality:"India",
      address1:"New Sangvi",
      city:"Pune",
      state:"Maharashtra", 
      pin:"411027", 
      countryBirth:"India", 
      country:"+91",
      wishToAddCard:"N" 
    });
    component.onRegistrationForm();
    // expect(window.alert).toHaveBeenCalledWith(errorMessage);
    expect(window.alert).toBe(errorMessage);
  });

 
  it('should handle failed registration', () => {
    const mockErrorResponse = {
      message: {
        code: 400,
        description: 'Bad Request',
      },
    };
    component.registrationForm.setValue({
      userTitle:"mr",
      firstName:"shubham",
      lastName:"tile",
      dob:new Date("11/09/1993"),
      phoneNumber:"8788601371", 
      email:"shubhamtile@gmail.com",
      password:"test@123",
      gender:"Male",
      nationality:"India",
      address1:"New Sangvi",
      city:"Pune",
      state:"Maharashtra", 
      pin:"411027", 
      countryBirth:"India", 
      country:"+91",
      wishToAddCard:"N" 
    });
    mockApiService.onSignUpUser.and.returnValue(throwError(mockErrorResponse));
    component.onRegistrationForm();
    // expect(window.alert).toHaveBeenCalledWith('Bad Request');
    expect(window.alert).toHaveBeenCalledWith("Bad Request");
  });
  
 
  it('should update stateResult with response data', () => {
    const mockStateData = {};
    console.log("mockStateData",mockStateData)
    mockApiService.getStateData.and.returnValue(of(mockStateData));
    component.fetchStateData();
    expect(component.stateResult).toEqual(mockStateData);
  });

  
  it('should update countryResult with response data', () => {
    const mockCountryData = {
      "name": "Angola",
      "dial_code": "+244",
      "code": "AO"
    };
    mockApiService.getCountryData.and.returnValue(of(mockCountryData));
    component.fetchCountryData();
    expect(component.countryResult).toEqual(mockCountryData);
  });
 
});

