import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionHistoryComponent } from './transaction-history.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { TransactionHistoryRoutingModule } from '../transaction-history.routing.module';
import { TransactionHistoryAPI } from '../transactions.api';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('TransactionHistoryComponent', () => {
  let component: TransactionHistoryComponent;
  let fixture: ComponentFixture<TransactionHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionHistoryComponent],
      imports: [MaterialModule, TransactionHistoryRoutingModule, HttpClientModule],
      providers: [TransactionHistoryAPI]
    });
    fixture = TestBed.createComponent(TransactionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('transaction details', () => {
    it('should GET all transaction details', () => {
      // Given
      let history = [
        {
          firstName: "Test",
          lastName: "Test",
          type: "Cash",
          date: "20 Aug 2023",
          status: "Pending",
          amount: "20"
        }
      ]
      spyOn(component['transactionApi'], 'getAllTransactions').and.returnValue(of(history));

      // When
      component.getTransactions();

      // Then
      expect(component.history).toBe(history);
    });
  });
});
