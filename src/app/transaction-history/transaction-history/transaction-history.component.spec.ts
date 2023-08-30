import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionHistoryComponent } from './transaction-history.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { TransactionHistoryRoutingModule } from '../transaction-history.routing.module';
import { TransactionHistoryAPI } from '../transactions.api';
import { HttpClientModule } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { TransactionHistory } from 'src/app/mocks/transaction-history.mock';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

describe('TransactionHistoryComponent', () => {
  let component: TransactionHistoryComponent;
  let fixture: ComponentFixture<TransactionHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionHistoryComponent],
      imports: [
        MaterialModule,
        TransactionHistoryRoutingModule,
        HttpClientModule
      ],
      providers: [
        TransactionHistoryAPI,
        SnackBarService
      ]
    });
    fixture = TestBed.createComponent(TransactionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('transaction history', () => {
    it('should GET all transaction history', () => {
      // Given
      spyOn(component['transactionApi'], 'getAllTransactions').and.returnValue(of(TransactionHistory));

      // When
      component.getTransactions();

      // Then
      expect(component.history).toEqual(TransactionHistory.transactions);
    });

    it('Error while getting transaction history', () => {
      // Given
      spyOn(component['transactionApi'], 'getAllTransactions').and.returnValue(throwError(() => new Error()));
      const openSnackBar = spyOn(component['snackBar'], 'openErrorSnackBar');

      // When
      component.getTransactions();

      // Then
      expect(openSnackBar).toHaveBeenCalledWith('Error while fetching transaction history', '');
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
      const transactionId = 'SM12341234';
      const index = 0;
      component.showDetails[index] = false;

      // When
      component.showReceiversDetails(transactionId, index);

      // Then
      expect(component.showDetails[index]).toBe(true);
    });

    it('should hide transaction details', () => {
      // Given
      const transactionId = 'SM12341234';
      const index = 0;
      component.showDetails[index] = true;

      // When
      component.showReceiversDetails(transactionId, index);

      // Then
      expect(component.showDetails[index]).toBe(false);
    });

    it('should change style.display to block if style.display is none', () => {
      // Given
      const transactionId = 'SM12341234';
      const index = 0;
      recDetails.style.display = 'none'

      // When
      component.showReceiversDetails(transactionId, index);

      // Then
      expect(recDetails.style.display).toBe('block');
    });

    it('should change style.display to none if style.display is block', () => {
      // Given
      const transactionId = 'SM12341234';
      const index = 0;
      recDetails.style.display = 'block'

      // When
      component.showReceiversDetails(transactionId, index);

      // Then
      expect(recDetails.style.display).toBe('none');
    });
  });
});
