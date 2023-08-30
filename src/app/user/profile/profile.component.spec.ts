import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import { ApiService } from 'src/app/shared/api.service';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let apiService: ApiService
  let httpController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatGridListModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule
      ],
      declarations: [ProfileComponent],
      providers:[ApiService]
    });
    apiService = TestBed.inject(ApiService)
    httpController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call getProfile and return user profile details', () => {
    component?.profileForm?.patchValue({
      userTitle: "Mr",
      firstName: "Radhakrishna1",
      lastName: "B",
      dob: "22-08-1999",
      email: "rohittwo@gmail.com",
      phoneNumber: 9886098860,
      gender: "Male",
      nationality: "Indian",
      address1: "Park Street",
      city: "Bangalore",
      state: "Karnataka",
      pin: 411322,
      country: "India",
      countryBirth: "India",
      identificationType: "PASSPORT",
      identificationNumber: "AKS1212333",
      issuingAuthority: "Govt of India"
    });
    component?.onUpdate()
    //console.log(component.registrationForm.value);
    expect(component?.profileForm.valid).toEqual(true);
    expect(component?.profileFormData).toEqual(component?.profileForm);
  });

  it('should call get getDataCard and return user card details', () => {
    apiService.getProfile(apiService?.getLoginEmail()).subscribe((res:any) => {
      expect(res.status).toEqual(200);
      expect(res.userDetails).not.toBe('');
      expect(res.userDetails).not.toBe([]);
    });
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should trigger onResize method when window is resized',()=>{
    const spyOnResize = spyOn(component, 'onResize');
    window.dispatchEvent(new Event('resize'));
    expect(spyOnResize).toHaveBeenCalled();
  });
  it('should call onEdit() by user ',()=>{
    component.onEdit();
    expect(component.profileForm.enabled).toBe(true);
  });
  /*it('should call onEdit() by user ',()=>{
    component.onEdit();
    expect(component.profileForm.enabled).toBe(true);
  });*/
});
