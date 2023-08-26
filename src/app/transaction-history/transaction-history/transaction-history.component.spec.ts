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
      let history = {
        status: 200,
        message: {
          code: "200",
          description: "Success"
        },
        errors: null,
        transactions: [
          {
            txnId: "SM12341234",
            senderId: 1,
            receiverId: 1,
            txnAmount: 100.0,
            senderPaymentMethod: "CARD",
            senderCardNumber: 4321432143214321,
            senderCardExpiry: "08/2026",
            senderNameOnCard: "Radhakrishna",
            receiverPaymentMethod: "BANK",
            receiverAccountNumber: 12341234,
            receiverIban: "IDFC2134",
            txnType: "SENDMONEY",
            fxRate: 1.1,
            exchangeFee: 1.1,
            receiverPayOut: 8206.38,
            senderCurrency: "USD",
            receiverCurrency: "INR",
            receiverCountryIso: "IN",
            mtcn: 12341234,
            txnStatus: "TS",
            txnDate: "22-08-2023",
            thirdPartyRefId: "FIS12341234",
            createdBy: "SYSTEM",
            createdOn: "22-08-2023",
            modifiedBy: "SYSTEM",
            modifiedOn: "22-08-2023",
            settlementRefId: "ST12341234",
            txnSettledOn: "22-08-2023",
            refundReffTxnId: null,
            remarks: "Transaction Success"
          }
        ]
      }
      spyOn(component['transactionApi'], 'getAllTransactions').and.returnValue(of(history));

      // When
      component.getTransactions();

      // Then
      expect(component.history).toEqual(history.transactions);
    });
  });
});
