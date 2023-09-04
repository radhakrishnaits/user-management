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
    // httpMock.verify();
  });

  it('should send a POST request with correct headers sign-up', () => {
    const requestBody = {};
    service.onSignUpUser(requestBody).subscribe(response => {
      expect(response).toBeTruthy();
    });
    const expectedHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    const mockRequest = httpMock.expectOne(`${service.apiUrl}signup`);
    expect(mockRequest.request.method).toBe('POST');
    expect(mockRequest.request.headers).toEqual(expectedHeaders);
    mockRequest.flush({ });
  });

  it('should send a POST request with correct headers and URL for sign-in', () => {
    const requestBody = {};
    service.onSignInUser(requestBody).subscribe(response => {
      expect(response).toBeTruthy();
    });
    const req = httpMock.expectOne(`${service.apiUrl}signin`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.headers.get('Access-Control-Allow-Origin')).toBe('*');
    expect(req.request.headers.get('Access-Control-Allow-Methods')).toBe('GET,POST,OPTIONS,DELETE,PUT');
    req.flush({}); // You can provide a mock response if needed
  });

  it('should call getProfile and return logged in user details', () => {
    service.getProfile(service.getLoginEmail()).subscribe((res:any) => {
      expect(res.status).toEqual(200);
      expect(res.userDetails).not.toBe('');
    });
  });

});
