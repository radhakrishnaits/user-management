import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import {profile} from '../../mocks/profile.mock'
import {of} from "rxjs";
import {HttpClientModule, HttpErrorResponse} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "../../shared/material.module";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {environment} from "../../../environments/environment";
import {ApiService} from "../../shared/api.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {SessionStorageService} from "../../shared/session-storage.service";
import {userCard} from "../../mocks/userCard";

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  const fb = jasmine.createSpyObj('FormBuilder', ['group']);
  let service: ApiService;
  let serviceSession: SessionStorageService
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
    serviceSession = TestBed.inject(SessionStorageService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should be created Session', () => {
    expect(serviceSession).toBeTruthy();
  });
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
  it('should remove an item from sessionStorage', () => {
    const key = 'itemToRemove';
    const value = 'valueToBeRemoved';

    serviceSession.setItem(key, value);
    serviceSession.removeItem(key);
    const retrievedValue = serviceSession.getItem(key);

    expect(retrievedValue).toBeNull();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('get profile', () => {
    spyOn(component["apiService"],"getProfile").withArgs(environment.fakeLoginEmail).and.returnValue(of(profile.getProfileResponse));
    // When
    component.getProfileData();
    // Then
    expect(component.data).toEqual(profile.getProfileResponse.userDetails)
    fixture.detectChanges();
  });
  it('onProfileEdit', () => {
    // When
    component.onProfileEdit();
    // Then
    expect(component.profileForm.enabled).toBeTruthy()
    fixture.detectChanges();
  });
  describe('onResize()', () => {
    it('should call onResize if width greater than or equal to 660', () => {
      // Given
      const event = {
        target: {
          innerWidth: window.innerWidth
        }
      }
      // When
      component.onResize(event);
      // Then
      expect(component.matGridCol).toEqual(3);
    });
  });
  describe('deleteUserCardDetail()', () => {
    it('should call deleteUserCardDetail', () => {
      // Given
      const cardNumber = 4444222233334444
      spyOn(component['apiService'],'deleteUserCard').and.returnValue(of({}))
      // When
      component.deleteUserCardDetail(cardNumber)
      // Then
      expect(userCard.deleteUserCardData.userCards.length).toEqual(0);
    });
  });
  describe('addUserCard()', () => {
    it('should call addUserCard', () => {
      // Given
      const requestBody = {
        "cardNumber": 3123123123213432,
        "cardExpiry": Number(new Date().getFullYear()+("0" + (new Date().getMonth() + 1)).slice(-2)),
        "nameOnCard": "test name"
      }
      spyOn(component['apiService'],'addUserCard').and.returnValue(of({}))
      // When
      component.addUserCard()
      // Then
      expect(userCard.addUserCardData.status).toEqual(200);
    });
    /*it("on cardDateCheck()", () => {
      component.cardDateCheck()
      expect(component.addCardForm.controls['cardExpiry'].hasError('incorrect')).toBeFalsy()
      fixture.detectChanges();
    });*/
    it('should set errors if card expiry is in the past', () => {
      // Arrange: Set up the component's form and its value
      const cardExpiryControl = component.addCardForm.controls['cardExpiry'];
      cardExpiryControl.setValue('01/2021'); // Assuming you want to check for a past date

      // Act: Call the cardDateCheck method
      component.cardDateCheck();

      // Assert: Check if the cardExpiry control has 'incorrect' errors
      expect(cardExpiryControl.hasError('incorrect')).toBeTruthy();
    });
    it('should not set errors if card expiry is in the future', () => {
      // Arrange: Set up the component's form and its value
      const cardExpiryControl = component.addCardForm.controls['cardExpiry'];
      cardExpiryControl.setValue('12/2088'); // Assuming you want to check for a future date

      // Act: Call the cardDateCheck method
      component.cardDateCheck();

      // Assert: Check if the cardExpiry control does not have 'incorrect' errors
      expect(cardExpiryControl.hasError('incorrect')).toBeFalsy();
    });
    it('should call addUserCard when form is valid', fakeAsync(() => {
      // Create a spy for the cardDateCheck method if needed
      spyOn(component, 'cardDateCheck');

      // Set the form to valid
      component.addCardForm.setValue({
        cardNumber: '3123123123213432',
        cardExpiry: '0923',
        nameOnCard: 'test name',
      });

      // Create a mock response
      const mockResponse = {
        "status": 200,
        "message": {
          "code": "200",
          "description": "User Cards added successfully"
        },
        "errors": null
      }

      // Create a spy for addUserCard and return an Observable with your mock response
      spyOn(service, 'addUserCard').and.returnValue(of(mockResponse));

      // Call the function that contains the logic
      component.addUserCard();

      // Expect that the cardDateCheck method was called
      expect(component.cardDateCheck).toHaveBeenCalled();

      // Expect that the addUserCard method was called with the correct parameters
      expect(service.addUserCard).toHaveBeenCalledWith(
        {
          cardNumber: 3123123123213432,
          cardExpiry: '0923',
          nameOnCard: 'test name',
        },
        component.loginEmail || ''
      );

      // Use tick to advance time if there are asynchronous operations
      tick();

      // You can add additional expectations based on your component's behavior
      // For example, test that existingCardDetails and getUserCardData were updated correctly.
      expect(component.existingCardDetails).toEqual(mockResponse);
      // Add your getUserCardData expectation here
    }));
    it('should update profile when form is valid', () => {
      // Arrange
      component.profileForm.patchValue({"userTitle":"Mr","firstName":"shubham","lastName":"tile","address1":"New Sangvi","city":"Pune","state":"Maharashtra","country":"+91","phoneNumber":8788601371,"pin":311211,"countryBirth":"India","nationality":"India","gender":"Male","dob":"1993-11-08T18:30:00.000Z","email":"rohittwo@gmail.com"});

      spyOn(service, 'updateProfile').and.returnValue(of({ message: { description: 'Profile updated successfully' } }));

      // Act
      component.onProfileUpdate();

      // Assert
      expect(component.profileFormData).toEqual(component.profileForm.value);
      expect(service.updateProfile).toHaveBeenCalledWith(component.profileFormData, component.loginEmail);
      expect(component.onUpdateProfileSuccessMessage).toEqual('Profile updated successfully');
    });

    it('should not update profile when form is invalid', () => {
      // Arrange
      component.profileForm.setValue({ /* Provide invalid form data here */ });
      spyOn(service, 'updateProfile');

      // Act
      component.onProfileUpdate();

      // Assert
      expect(service.updateProfile).not.toHaveBeenCalled();
    });
    it('should set isCardExist to true and populate existingCardDetails when API call succeeds', () => {
      // Arrange
      const mockApiResponse = {
        "status": 200,
        "message": {
          "code": "200",
          "description": "Success"
        },
        "errors": null,
        "userCards": [
          {
            "cardNumber": 2132312312312321,
            "cardExpiry": "02/2021",
            "nameOnCard": "wdadav casdad"
          },
          {
            "cardNumber": 1231231232131231,
            "cardExpiry": "08/2023",
            "nameOnCard": "sadsda dasdad"
          }
        ]
      };
      spyOn(service, 'getUserCard').and.returnValue(of(mockApiResponse));

      // Act
      component.getUserCardData();

      // Assert
      expect(service.getUserCard).toHaveBeenCalledWith(component.loginEmail || '');
      expect(component.isCardExist).toBe(true);
      expect(component.existingCardDetails).toEqual(mockApiResponse.userCards);
    });

    it('should not modify isCardExist or existingCardDetails when API call fails', () => {
      // Arrange
      spyOn(service, 'getUserCard').and.returnValue(of({})); // Simulate an empty response or error

      // Act
      component.getUserCardData();

      // Assert
      expect(service.getUserCard).toHaveBeenCalledWith(component.loginEmail || '');
      expect(component.isCardExist).toBe(true); // Or the initial value before the API call
      expect(component.existingCardDetails).toEqual([]); // Or the initial value before the API call
    });
  });
});
