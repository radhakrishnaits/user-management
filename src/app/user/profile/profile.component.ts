import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  profileForm!: FormGroup;
  test:string ='test';
  profileData = [
    {
      firstName:'',
      lastName:'',
      email:'',
      phone:'',
      dob:'',
      pob:'',
      occupation:'',
      countryCode:'',
      address:'',
      city:'',
      state:'',
      pinCode:''
    }
  ]

  onSubmit() {
  }
  ngOnInit(): void {
    this.profileForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      dob: new FormControl(''),
      pob: new FormControl(''),
      occupation: new FormControl(''),
      countryCode: new FormControl(''),
      address: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      pinCode: new FormControl(''),
    });
  }
}
