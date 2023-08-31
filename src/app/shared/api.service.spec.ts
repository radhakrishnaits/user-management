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
});
