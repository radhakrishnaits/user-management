import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardModule } from '@angular/material/card';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialModule } from 'src/app/shared/material.module';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SessionStorageService} from "../../shared/session-storage.service";
import { ApiService } from 'src/app/shared/api.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  // rohit
  let serviceSession: SessionStorageService;
  // rohit

  let apiService: ApiService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent,MatCard,MatCardContent,MatCardActions,MatCardHeader],
      imports:[MatCardModule,HttpClientModule,FormsModule,ReactiveFormsModule,MatInputModule,
        MatFormFieldModule,MaterialModule,BrowserAnimationsModule,RouterTestingModule],
      providers:[FormBuilder,MatDialog,  ApiService]
    }).compileComponents();
    // fixture = TestBed.createComponent(LoginComponent);
    // component = fixture.componentInstance;
    // rohit
    // serviceSession = TestBed.inject(SessionStorageService);
    // rohit
    // fixture.detectChanges();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    router = TestBed.inject(Router);
    serviceSession = TestBed.inject(SessionStorageService);
    fixture.detectChanges();
  });

  it('should be created Session', () => {
    expect(serviceSession).toBeTruthy();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // rohit
  it('should set and get an item from sessionStorage', () => {
    // Given
    const key = 'testKey';
    const value = 'testValue';
    // When
    serviceSession.setItem(key, value);
    const retrievedValue = serviceSession.getItem(key);
    // Expect
    expect(retrievedValue).toBe(value);

    /*// When login
    component.ngOnInit()
    // Expect
    expect(component.isLogin).toBeTruthy()*/
  });


  //Shubham
  it('should navigate to user-profile when email is present in sessionStorage', () => {
    serviceSession.setItem('email', 'test@example.com');
    // component.ngOnInit();
    fixture.whenStable().then(() => {
      const navigateByUrlSpy = spyOn(router, 'navigateByUrl');
      // expect(navigateByUrlSpy).toHaveBeenCalledWith('/user-profile');
    });
  });

  // Shubham
  it('should not navigate to user-profile when email is not present in sessionStorage', () => {
    serviceSession.removeItem('email');
    fixture.whenStable().then(() => {
      const navigateByUrlSpy = spyOn(router, 'navigateByUrl');
      expect(navigateByUrlSpy).not.toHaveBeenCalled();
    });
  });


  it('should handle successful login', fakeAsync(() => {
    const mockResponse = {
      message: {
        description: 'Login successful',
      },
      userName: 'user@example.com',
      firstName: 'John',
      lastName: 'Doe',
    };

    spyOn(apiService, 'onSignInUser').and.returnValue(of(mockResponse));
    spyOn(window, 'alert');
    spyOn(serviceSession, 'setItem');
    spyOn(router, 'navigateByUrl');
    // spyOn(window, 'location').and.returnValue({ reload: () => {} });
    

    component.loginForm.controls['username'].setValue('testUser');
    component.loginForm.controls['password'].setValue('testPassword');

    component.onLoginUser();
    tick(); // Simulate the passage of time for observables

    // Assertions
    expect(apiService.onSignInUser).toHaveBeenCalledWith(component.loginForm.value);
    expect(window.alert).toHaveBeenCalledWith(mockResponse['message']?.description);
    expect(component.loginForm.value).toEqual({});
    expect(serviceSession.setItem).toHaveBeenCalledWith('email', mockResponse['userName']);
    expect(serviceSession.setItem).toHaveBeenCalledWith('firstName', mockResponse['firstName']);
    expect(serviceSession.setItem).toHaveBeenCalledWith('lastName', mockResponse['lastName']);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/user-profile');
    expect(window.location.reload).toHaveBeenCalled();
  }));

  it('should handle login error', fakeAsync(() => {
    const mockError = {
      error: {
        message: {
          description: 'Login failed',
        },
      },
    };

    spyOn(apiService, 'onSignInUser').and.returnValue(throwError(mockError));
    spyOn(window, 'alert');

    component.loginForm.controls['username'].setValue('testUser');
    component.loginForm.controls['password'].setValue('testPassword');

    component.onLoginUser();
    tick(); // Simulate the passage of time for observables

    // Assertions
    expect(apiService.onSignInUser).toHaveBeenCalledWith(component.loginForm.value);
    expect(window.alert).toHaveBeenCalledWith(mockError.error.message.description);
  }));
});
