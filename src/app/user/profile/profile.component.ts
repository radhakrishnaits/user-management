import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from "../../shared/api.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit{
  avatarName = sessionStorage.getItem('firstName') +' ' + sessionStorage.getItem('lastName');
  getInitials = function (name:string) {
    let parts = name.split(' ')
    let initials = ''
    for (let i = 0; i < parts.length; i++) {
      if (parts[i].length > 0 && parts[i] !== '') {
        initials += parts[i][0]
      }
    }
    return initials
  }
  loginEmail = sessionStorage.getItem('email')
  regExAllowStringAndSpace = "^[a-zA-Z_ ]*$";
  regExAllowEmail = "^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$";
  regExAllow16DigitNumber = "(?:\\d[ -]*?){13,16}"
  regExAllowCardExpiry = "^(0[1-9]|1[0-2])\\/?([0-9]{4}|[0-9]{2})$"
  isLogin:boolean = false;
  profileForm!: FormGroup;
  profileFormData:any ='';
  addCardForm!: FormGroup;
  breakpoint:any='';
  isDisabled: boolean = true;
  isEdit: boolean = true;
  isEditClicked: boolean = false;
  stateResult: any;
  countryResult: any;
  isCardExist: boolean = false
  existingCardDetails: any = ''
  public data:any
  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private router: Router
  ) {
    this.http.get('assets/json/state.json').subscribe((res) => {
      this.stateResult = res;
    });
    this.http.get('assets/json/country.json').subscribe((res) => {
      this.countryResult = res;
    });
  }
  onUpdate() {
    if(this.profileForm.valid) {
      this.profileFormData = this.profileForm.value
      this.apiService.updateProfile(this.profileFormData,this.loginEmail).subscribe(
        (res:any) => {
          if(res?.message?.code == 200){
            alert(res["message"]?.description)
          }
        },
        (err:any) => {
          alert(err?.message);
        }
      );
    } else {
      alert('Form is invalid. Please check')
    }
  }
  ngOnInit(): void {
    if (sessionStorage.getItem("email")) {
      this.isLogin = true
    }
    if(!this.isLogin) {
      this.router.navigateByUrl('/').then()
    }
    this.breakpoint = (window.innerWidth <= 768) ? 1 : 3
    this.profileForm = new FormGroup({
      userTitle: new FormControl({value: '', disabled: this.isDisabled},[Validators.required]),
      firstName: new FormControl({value: '', disabled: this.isDisabled},[Validators.required,Validators.pattern(this.regExAllowStringAndSpace)]),
      lastName: new FormControl({value: '', disabled: this.isDisabled},[Validators.required,Validators.pattern(this.regExAllowStringAndSpace)]),
      address1: new FormControl({value: '', disabled: this.isDisabled},[Validators.required]),
      city: new FormControl({value: '', disabled: this.isDisabled},[Validators.required,Validators.pattern(this.regExAllowStringAndSpace)]),
      state: new FormControl({value: '', disabled: this.isDisabled},[Validators.required]),
      country: new FormControl({value: '', disabled: this.isDisabled},[Validators.required]),
      pin: new FormControl({value: null, disabled: this.isDisabled}),
      phoneNumber: new FormControl({value: '', disabled: this.isDisabled},[Validators.required]),
      countryBirth: new FormControl({value: '', disabled: this.isDisabled},[Validators.required]),
      nationality: new FormControl({value: '', disabled: this.isDisabled},[Validators.required]),
      gender: new FormControl({value: '', disabled: this.isDisabled},[Validators.required]),
      dob: new FormControl({value: '', disabled: this.isDisabled},[Validators.required]),
      email: new FormControl({value: '', disabled: this.isDisabled},[Validators.required,Validators.email,Validators.pattern(this.regExAllowEmail)]),
    });
    this.getData()
    this.addCardForm = new FormGroup({
      cardNumber: new FormControl('',[Validators.required,Validators.pattern(this.regExAllow16DigitNumber)]),
      cardExpiry: new FormControl('',[Validators.required,Validators.pattern(this.regExAllowCardExpiry)]),
      nameOnCard: new FormControl('',[Validators.required,Validators.pattern(this.regExAllowStringAndSpace)]),
    });
    this.getDataCard()
  }
  getData() {
    if (this.profileForm.invalid) {
      alert("All fields are required");
    } else {
      this.apiService.getProfile(this.loginEmail).subscribe(
        res => {
          this.data = res
          this.data = this.data?.userDetails
          this.profileForm.patchValue({
            userTitle: this.data.userTitle,
            firstName: this.data.firstName,
            lastName: this.data.lastName,
            address1: this.data.address1,
            city: this.data.city,
            state: this.data.state,
            country: this.data.country,
            pin: this.data.pin,
            phoneNumber: this.data.phoneNumber,
            countryBirth: this.data.countryBirth,
            nationality: this.data.nationality,
            gender: this.data.gender,
            dob: new Date(this.data.dob),
            email: this.data.email,
          })
        },
        err => {
          console.error(err)}
      );
    }

  }
  getDataCard() {
    this.apiService.getUserCard(this.loginEmail || '').subscribe(
      (res:any) => {
        if(res?.status == 200){
          if(res?.userCards.length == 0){
            this.isCardExist = false
          }
          else {
            this.isCardExist = true
            this.existingCardDetails = res.userCards
          }
        }
      }
    )
  }
  clearCardForm(){
    (<HTMLFormElement>document.getElementById("addCardForm")).reset();
  }

  addUserCard() {
    if(this.addCardForm.invalid) {
      alert("Please validate form fields")
      return
    }
    let cardMonth = this?.addCardForm?.value?.cardExpiry.split('/')[0]
    let cardYear = this?.addCardForm?.value?.cardExpiry.split('/')[1]

    let currentYear = new Date().getFullYear();
    let currentMonth = ("0" + (new Date().getMonth() + 1)).slice(-2);
    if(cardYear < currentYear) {
      alert("Please select correct card expiry year!")
      return
    }
    if(cardMonth < currentMonth) {
      alert("Please select correct card expiry month!")
      return
    }
    let requestBody = {
      "cardNumber": Number(this?.addCardForm?.value?.cardNumber),
      "cardExpiry": this?.addCardForm?.value?.cardExpiry,
      "nameOnCard": this?.addCardForm?.value?.nameOnCard
    }
    this.apiService.addUserCard(requestBody,this.loginEmail || '').subscribe(
      (res:any) => {
        if(res?.status == 200){
          alert(res["message"]?.description)
          this.existingCardDetails = res
          this?.clearCardForm()
          this.getDataCard()
        }
        else if(res) {
          alert(res["errorMessage"])
        }
      },
  (err:any) => {
        if(err) {
          alert(err)
        }
      }
    )
  }
  deleteUserCardDetail(cardNumber:number){
    this.apiService.deleteUserCard(this.loginEmail || '',cardNumber).subscribe(
      (res:any) => {
        if(res?.status == 204){
          alert(res["message"]?.description)
          this.getDataCard()
        }
        else if(res) {
          alert(res["errorMessage"])
        }
      },
      (err:any) => {
        if(err) {
          alert(err)
        }
      }
    )
  }
  onResize(event:any) {
    this.breakpoint = (event.target.innerWidth <= 768) ? 1 : 3
  }
  public profileFromError = (controlName: string, errorName: string) =>{
    return this.profileForm.controls[controlName].hasError(errorName)
  }
  public cardFormError = (controlName: string, errorName: string) =>{
    return this.addCardForm.controls[controlName].hasError(errorName)
  }
  onEdit() {
    this.isEdit = false
    this.isDisabled = false
    this.profileForm.get('userTitle')?.enable();
    this.profileForm.get('firstName')?.enable();
    this.profileForm.get('lastName')?.enable();
    this.profileForm.get('address1')?.enable();
    this.profileForm.get('city')?.enable();
    this.profileForm.get('state')?.enable();
    this.profileForm.get('country')?.enable();
    this.profileForm.get('pin')?.enable();
    this.profileForm.get('phoneNumber')?.enable();
    this.profileForm.get('countryBirth')?.enable();
    this.profileForm.get('nationality')?.enable();
    this.profileForm.get('gender')?.enable();
    this.profileForm.get('dob')?.enable();
    this.profileForm.get('email')?.enable();
    this.isEditClicked=true
  }
}
