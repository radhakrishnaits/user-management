import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TransactionHistoryAPI } from './transactions.api';
import { TransactionHistory } from '../mocks/transaction-history.mock';

describe('TransactionHistoryAPI', () => {
    let service: TransactionHistoryAPI;
    let httpController: HttpTestingController;

    let url = 'http://localhost:8080/user-management/v1';
    let userName = '';
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: []
        });
        service = TestBed.inject(TransactionHistoryAPI);
        httpController = TestBed.inject(HttpTestingController);
    });

    describe('getAllTransactions', () => {
        it('should get all transactions history for user', () => {
            // When
            service.getAllTransactions().subscribe((res) => {
                expect(res).toEqual(TransactionHistory);
            });

            // Then
            const req = httpController.expectOne({
                method: 'GET',
                url: `${url}/users/${userName}/txnhistory`,
            });
            expect(req.cancelled).toBeFalsy();
            expect(req.request.responseType).toEqual('json');
            req.flush(TransactionHistory);
            httpController.verify();
        });

        it("Httpclient 500 error test case", () => {
            // Given
            const errorMsg = "500: Someting went wrong";

            // When
            service.getAllTransactions().subscribe((response) => {
                fail('500: Someting went wrong');
            }, error => {
                expect(error.status).toEqual(404);
                expect(error.error).toEqual(errorMsg);
            });

            // Then
            const req = httpController.expectOne({
                method: 'GET',
                url: `${url}/users/${userName}/txnhistory`,
            });
            req.flush(errorMsg, { status: 500, statusText: 'Internal server error' });
            httpController.verify();
        });
    })
});
