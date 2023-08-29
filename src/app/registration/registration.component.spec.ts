import { ComponentFixture, TestBed, inject, getTestBed  } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { RegistrationComponent } from './registration.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
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
import { ApiService } from '../shared/api.service';
import { ReceiversModule } from '../receivers/receivers.module';
import { of } from 'rxjs';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let baseUrl = "http://localhost:8080/user-management/v1/signup";


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports:[HttpClientTestingModule, FormsModule, ReactiveFormsModule,MaterialModule,HttpClientModule,AsyncPipe,MatGridListModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        MatDividerModule,
      BrowserAnimationsModule,ReceiversModule],
      providers:[FormBuilder,MatDialog,ApiService]
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
    expect(component.registrationForm.valid).toEqual(true);
    expect(component.registrationFormDetails).toEqual(component.registrationForm.value);
    expect(component.registrationForm.reset);

  });

  it('should call onResize() on  method',()=>{


    const event =  {
      target : {
        innerWidth:window.innerWidth
      } 
    }

    component.onResize(event);   
    expect(component.matGridCol).toEqual(3);
    expect(component.matGridHeight).toEqual("3:0.5");
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
      country:""
      // wishToAddCard:""
    });
    component.onRegistrationForm();
    expect(component.registrationForm.valid).toEqual(false);
    // console.log("status",component.registrationForm.status);
    // expect(component.registrationForm.status.toEqual("INVALID"));
    // expect(window.alert).toHaveBeenCalledWith("INVALID");
  });

  it('should check hidePassword',()=>{
    expect(component.hidePassword).toEqual(true);
  });

 
});

describe('ApiService',() => {

  let baseUrl = "http://localhost:8080/user-management/v1/signup";
  let apiService:ApiService;
  let httpTestingController:HttpTestingController;
  let httpClientSpy :jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient',['post']);
    apiService = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  var request={
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
  }

  // let response = {
  //   userTitle:"mr",
  //   firstName:"shubham",
  //   lastName:"tile",
  //   dob:new Date("11/09/1993"),
  //   phoneNumber:"8788601371", 
  //   email:"shubhamtile@gmail.com",
  //   password:"test@123",
  //   gender:"Male",
  //   nationality:"India",
  //   address1:"New Sangvi",
  //   city:"Pune",
  //   state:"Maharashtra", 
  //   pin:"411027", 
  //   countryBirth:"India", 
  //   country:"+91",
  //   wishToAddCard:"N" 
  // }

  console.log("test posts1");
  it("should return response when api called ", (done:DoneFn) =>{

    apiService.onSignUpUser(request).subscribe((data)=>{
      expect(data).toEqual(request);
      done();
    },error=>{
      done.fail();
      expect(window.alert).toHaveBeenCalledWith(error.message);
    });

    const req = httpTestingController.expectOne({
      method:"POST",
      url:baseUrl
    });

    // expect(window.alert).toHaveBeenCalledWith("VALID");
    req.flush(request);
    httpTestingController.verify();
  });

  it("httpclient 404 error test case",()=>{

    const errorMsg = "User is already exists";
    apiService.onSignUpUser(request).subscribe((data)=>{
        fail('User is already exists');
    },error=>{
          expect(error.status).toEqual(404);
          expect(error.error).toEqual(errorMsg);
          // expect(window.alert).toHaveBeenCalledWith();
          // fail('User is already exists');
    });

    
    const req = httpTestingController.expectOne({
      method:"POST",
      url:baseUrl
    });
    req.flush(errorMsg, {status:404, statusText:'Not Found'});
    httpTestingController.verify(); 
  });
  
  // it("should return posts when api called ", (done:DoneFn) =>{
    //   httpClientSpy.post.and.returnValue(of(response));
    //   apiService.onSignUpUser(request).subscribe({
    //     next:(posts)=>{
    //       console.log("posts ",posts);
    //       expect(posts).toEqual(response)
    //     },
    //     error:()=>{
    //       done.fail;
    //     },
    //   })
    //   expect(httpClientSpy.post).toHaveBeenCalled();
  // })

});

