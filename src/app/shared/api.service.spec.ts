import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import { AppComponent } from '../app.component';
import { MatGridListModule } from '@angular/material/grid-list';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [HttpClientTestingModule,HttpClientModule,MatGridListModule],
      declarations: [AppComponent],
    });
    service = TestBed.inject(ApiService);
  });

  it('should call getProfile and return logged in user details', () => {
    service.getProfile(service.getLoginEmail()).subscribe((res:any) => {
      expect(res.status).toEqual(200);
      expect(res.userDetails).not.toBe('');
    });
  });

});
