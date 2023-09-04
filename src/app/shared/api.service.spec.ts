import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should send a POST request with correct headers', () => {
    const requestBody = {};

    service.onSignUpUser(requestBody).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const expectedHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');

      // console.log("service.apiUrl",service.apiUrl);
    const mockRequest = httpMock.expectOne(`${service.apiUrl}signup`);
    expect(mockRequest.request.method).toBe('POST');
    expect(mockRequest.request.headers).toEqual(expectedHeaders);
    mockRequest.flush({ });
  });

  it('should call getProfile and return logged in user details', () => {
    service.getProfile(service.getLoginEmail()).subscribe((res:any) => {
      expect(res.status).toEqual(200);
      expect(res.userDetails).not.toBe('');
    });
  });
  it('should update user profile', () => {
    const email = 'test@example.com';
    const requestBody = {
      "userTitle": "mr",
      "firstName": "shubham",
      "lastName": "tile",
      "dob": "1993-11-08T18:30:00.000Z",
      "email": "shubhamtile@gmail.com",
      "phoneNumber": 8788601371,
      "gender": "Male",
      "nationality": "India",
      "address1": "New Sangvi",
      "city": "Pune",
      "state": "Maharashtra",
      "pin": 411322,
      "country": "+91",
      "countryBirth": "India"
    };

    // Make the HTTP PUT request
    service.updateProfile(requestBody, email).subscribe((response) => {
      // Assert that the response is what you expect
      expect(response).toBeTruthy();
      // You can add more assertions here based on your specific use case
    });

    // Expect a single request to the specified URL with the given method and request body
    const req = httpMock.expectOne(service.apiUrl + 'users/' + email);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(requestBody);

    // Simulate a successful HTTP response
    req.flush({ /* Your response data here */ });
  });
  it('should add a user card', () => {
    const email = 'test@example.com';
    const requestBody = {
      "cardNumber": 4444222012333444,
      "cardExpiry": "08/2031",
      "nameOnCard": "Rohit"
    };

    // Make the HTTP POST request
    service.addUserCard(requestBody, email).subscribe((response) => {
      // Assert that the response is what you expect
      expect(response).toBeTruthy();
      // You can add more assertions here based on your specific use case
    });

    // Expect a single request to the specified URL with the given method and request body
    const req = httpMock.expectOne(service.apiUrl + 'users/' + email + '/cards');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(requestBody);

    // Simulate a successful HTTP response
    req.flush({ /* Your response data here */ });
  });
  it('should delete a user card', () => {
    const email = 'test@example.com';
    const cardNumber = 1234123412341234; // Example card number

    // Make the HTTP DELETE request
    service.deleteUserCard(email, cardNumber).subscribe((response) => {
      // Assert that the response is what you expect
      expect(response).toBeTruthy();
      // You can add more assertions here based on your specific use case
    });

    // Expect a single request to the specified URL with the correct method
    const expectedUrl = service.apiUrl + 'users/' + email + '/cards/' + cardNumber;
    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toEqual('DELETE');

    // Simulate a successful HTTP response
    req.flush({
      "status": 200,
      "message": {
        "code": "200",
        "description": "Success"
      },
      "errors": null,
      "userCards": []
    });
  });

});
