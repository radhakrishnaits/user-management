import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  profileForm!: FormGroup;
  breakpoint:any='';
  isReadOnly: boolean = true;
  isEdit: boolean = true;
  profileData =
    {
      firstName:'John',
      lastName:'Doe',
      emailId:'john@gmail.com',
      phoneNumber:'9988776655',
      dob:'8/24/2023',
      countryofbirth:'Pune',
      occupation:'Software Engineer',
      countryCode:'91',
      adress1:'Hinjewadi',
      city:'Pune',
      state:'Maharashtra',
      pin:'411411'
    }

  onSubmit() {
    console.log(this.profileForm.value)
  }
  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 768) ? 1 : 3
    this.profileForm = new FormGroup({
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      emailId: new FormControl('',[Validators.required,Validators.email]),
      phoneNumber: new FormControl('',[Validators.required]),
      dob: new FormControl('',[Validators.required]),
      countryofbirth: new FormControl('',[Validators.required]),
      occupation: new FormControl('',[Validators.required]),
      countryCode: new FormControl('',[Validators.required]),
      adress1: new FormControl('',[Validators.required]),
      city: new FormControl('',[Validators.required]),
      state: new FormControl('',[Validators.required]),
      pin: new FormControl('',[Validators.required]),
    });
    this.profileForm.patchValue({
      firstName: this.profileData.firstName,
      lastName: this.profileData.lastName,
      emailId: this.profileData.emailId,
      phoneNumber: this.profileData.phoneNumber,
      dob: new Date(this.profileData.dob),
      countryofbirth: this.profileData.countryofbirth,
      occupation: this.profileData.occupation,
      countryCode: this.profileData.countryCode,
      adress1: this.profileData.adress1,
      city: this.profileData.city,
      state: this.profileData.state,
      pin: this.profileData.pin,
    })
  }
  onResize(event:any) {
    this.breakpoint = (event.target.innerWidth <= 768) ? 1 : 3
  }
  public formError = (controlName: string, errorName: string) =>{
    return this.profileForm.controls[controlName].hasError(errorName)
  }
  onEdit() {
    this.isEdit = false
    this.isReadOnly = false
  }
}
