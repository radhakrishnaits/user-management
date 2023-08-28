import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiverListComponent } from './receiver-list.component';
import { ReceiversAPI } from '../receivers.api';
import { MaterialModule } from 'src/app/shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReceiversRoutingModule } from '../receivers-routing.module';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

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
        SnackBarService,
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
      let receiverDetails = {
        status: 200,
        message: {
          code: "200",
          description: "Success"
        },
        errors: null,
        beneficiaries: [
          {
            firstName: "Test",
            lastName: "Test",
            country: "India",
            bankAccountNumber: 1234567,
            iban: "IDFC004",
            nickName: "test123",
            mobileNumber: "8989898989"
          }
        ]
      }
      spyOn(component['receiversApi'], 'getAllReceivers').and.returnValue(of(receiverDetails));

      // When
      component.getAllReceivers();

      // Then
      expect(component.receiversDetails).toEqual(receiverDetails.beneficiaries);
    });
  });
});
