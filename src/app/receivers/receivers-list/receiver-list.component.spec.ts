import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiverListComponent } from './receiver-list.component';
import { ReceiversAPI } from '../receivers.api';
import { MaterialModule } from 'src/app/shared/material.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ReceiversRoutingModule } from '../receivers-routing.module';
import { of } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';

describe('ReceiversListComponent', () => {
  let component: ReceiverListComponent;
  let fixture: ComponentFixture<ReceiverListComponent>;
  let activatedRoute = {
    params: {
      subscribe() {
        return of();
      }
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceiverListComponent],
      providers: [
        ReceiversAPI,
        { provide: ActivatedRoute, useValue: activatedRoute }
      ],
      imports: [
        MaterialModule,
        HttpClientModule,
        ReceiversRoutingModule
      ]
    });
    fixture = TestBed.createComponent(ReceiverListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('receivers list details', () => {
    it('should GET all receivers details', () => {
      // Given
      let receiverDetails = [
        {
          "benFirstName": "Prashant",
          "benLastName": "Sutar",
          "benCountry": "India",
          "mobileNumber": "9809898089",
          "bankAccountNumber": "7988765456",
          "iban": "ICICI990909",
          "id": "ECWuLwC"
        }
      ]
      spyOn(component['receiversApi'], 'getAllReceivers').and.returnValue(of(receiverDetails));

      // When
      component.getAllReceivers();

      // Then
      expect(component.receiversDetails).toBe(receiverDetails);
    });
  });
});
