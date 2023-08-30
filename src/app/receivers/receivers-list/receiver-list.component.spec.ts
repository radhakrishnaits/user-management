import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiverListComponent } from './receiver-list.component';
import { ReceiversAPI } from '../receivers.api';
import { MaterialModule } from 'src/app/shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReceiversRoutingModule } from '../receivers-routing.module';
import { Observable, of, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { ReceiversDetails } from '../../mocks/receivers.mock';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ReceiversListComponent', () => {
  let component: ReceiverListComponent;
  let fixture: ComponentFixture<ReceiverListComponent>;
  let activatedRoute = {
    params: {
      subscribe() {
        return of();
      }
    }
  };

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
        ReceiversRoutingModule,
        BrowserAnimationsModule
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
      spyOn(component['receiversApi'], 'getAllReceivers').and.returnValue(of(ReceiversDetails.receiversDetails));

      // When
      component.getAllReceivers();

      // Then
      expect(component.receiversDetails).toEqual(ReceiversDetails.receiversDetails.beneficiaries);
    });
  });

  describe('openConfirmationModel()', () => {
    it('should open confirmation dialog for deleting receiver', () => {
      // Given
      const nickName = 'test123';
      const openDialogSpy = spyOn(component['dialog'], 'open');
      const fakeDialogConfig = new MatDialogConfig;
      const deleteReceiverRef: HTMLElement = component.deleteReceiver.nativeElement;
      const removeReceiverSpy = spyOn(component, 'removeReceiver');

      // When
      component.openConfirmationModel(nickName);

      // Then
      expect(openDialogSpy).toHaveBeenCalledWith(deleteReceiverRef, fakeDialogConfig);
      expect(removeReceiverSpy).toHaveBeenCalledWith(nickName);
      expect(deleteReceiverRef.title).toContain('Delete receiver');
    });
  });

  describe('removeReceiver()', () => {
    it('should remove receiver', () => {
      // Given
      const nickName = "test123";

      spyOn(component['receiversApi'], 'deleteReceiver').and.returnValue(of({}));
      const openSnackBar = spyOn(component['snackBarService'], 'openSuccessSnackBar');
      const getAllReceiversSyy = spyOn(component['receiversApi'], 'getAllReceivers').and.returnValue(of(ReceiversDetails.receiversDetails));

      // When
      component.removeReceiver(nickName);

      // Then
      expect(ReceiversDetails.deleteReceiver.beneficiaries.length).toBe(0);
      expect(openSnackBar).toHaveBeenCalledWith('Receiver deleted successfully', '');
      expect(getAllReceiversSyy).toHaveBeenCalledWith();
    });

    it('Error while removing receiver', () => {
      // Given
      const nickName = "test123";

      spyOn(component['receiversApi'], 'deleteReceiver').and.returnValue(throwError(() => new Error()));
      const openSnackBar = spyOn(component['snackBarService'], 'openErrorSnackBar');

      // When
      component.removeReceiver(nickName);

      // Then
      expect(openSnackBar).toHaveBeenCalledWith('Error while deleting receiver', '');
    });
  });

  describe('showReceiversDetails()', () => {
    let recDetails: any;

    beforeEach(() => {
      recDetails = document.createElement('div');
      document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(recDetails);
    });

    it('should show transaction details', () => {
      // Given
      const nickName = 'test123';
      const index = 0;
      component.showDetails[index] = false;

      // When
      component.showReceiversDetails(nickName, index);

      // Then
      expect(component.showDetails[index]).toBe(true);
    });

    it('should hide transaction details', () => {
      // Given
      const nickName = 'test123';
      const index = 0;
      component.showDetails[index] = true;

      // When
      component.showReceiversDetails(nickName, index);

      // Then
      expect(component.showDetails[index]).toBe(false);
    });

    it('should change style.display to block if style.display is none', () => {
      // Given
      const nickName = 'test123';
      const index = 0;
      recDetails.style.display = 'none'

      // When
      component.showReceiversDetails(nickName, index);

      // Then
      expect(recDetails.style.display).toBe('block');
    });

    it('should change style.display to none if style.display is block', () => {
      // Given
      const nickName = 'test123';
      const index = 0;
      recDetails.style.display = 'block'

      // When
      component.showReceiversDetails(nickName, index);

      // Then
      expect(recDetails.style.display).toBe('none');
    });
  });
});
