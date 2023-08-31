import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import {profile} from '../../mocks/profile.mock'
import {of} from "rxjs";
import {HttpClientModule, HttpErrorResponse} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "../../shared/material.module";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {environment} from "../../../environments/environment";
import {ApiService} from "../../shared/api.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  const fb = jasmine.createSpyObj('FormBuilder', ['group']);
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        HttpClientTestingModule

      ],
      providers: [FormBuilder,ApiService]
    });
    service = TestBed.inject(ApiService);
    fixture = TestBed.createComponent(ProfileComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('get profile', () => {
    spyOn(component["apiService"],"getProfile").withArgs(environment.fakeLoginEmail).and.returnValue(of(profile.getProfileResponse));

    // When
    component.getProfileData();

    // Then
    //expect(component.profileForm.value).toContain(profile.getProfileResponse);
    expect(component.data).toEqual(profile.getProfileResponse.userDetails)

    fixture.detectChanges();
    /*let firstName = component.profileForm.controls['firstName'];
    expect(firstName.valid).toBeFalsy()
    expect(firstName.errors['required']).toBeTruthy()*/
    // Given
    /*const updateProfileForm = fb.group({
      userTitle: ['Test123'],
      firstName: ['Test123'],
      lastName: ['India'],
      dob: ['22-08-1999'],
      phoneNumber: ['1234567'],
      gender: ['Male'],
      nationality: ['India'],
      address1: ['test123'],
      city: ['Bangalore'],
      state: ['Karnataka'],
      pin: ['411344'],
      country: ['India'],
      countryBirth: ['India'],
      identificationType: ['PASSPORT'],
      identificationNumber: ['AKS1212333'],
      issuingAuthority: ['Govt of India'],
    });
    spyOn(component['apiService'],'updateProfile').and.returnValue(of(profile.updateProfileResponse));
    // When
    component.onUpdate();
    // Then
    expect(updateProfileForm.invalid).toBeTrue();*/
  });

});
