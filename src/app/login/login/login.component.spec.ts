import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardModule } from '@angular/material/card';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialModule } from 'src/app/shared/material.module';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent,MatCard,MatCardContent,MatCardActions,MatCardHeader],
      imports:[MatCardModule,HttpClientModule,FormsModule,ReactiveFormsModule,MatInputModule,
        MatFormFieldModule,MaterialModule,BrowserAnimationsModule],
      providers:[FormBuilder,MatDialog]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onloginForm() on  method',()=>{
    
    component.loginForm.patchValue({
      username:"shubhamtile@gmail.com",
      password:"1234"
    });

    component.onLoginUser();
    console.log("test 1",component.loginForm.value);
    expect(component.loginForm.valid).toEqual(true);
    expect(component.loginFormDetails).toEqual(component.loginForm.value);
  
  });

  it('should require Invalid', () => {
  
    component.loginForm.patchValue({
      username:"",
      password:""
    });

    component.onLoginUser();
    console.log("test",component.loginForm.status);
    expect(component.loginForm.valid).toEqual(false);
    // expect(window.alert).toHaveBeenCalledWith("INVALID");    
  });

});
