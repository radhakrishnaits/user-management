import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReceiversAPI } from './receivers.api';
import { ReceiversDetails } from '../mocks/receivers.mock';

describe('ReceiversAPI', () => {
    let service: ReceiversAPI;
    let httpController: HttpTestingController;
    let url = 'http://localhost:8080/user-management/v1';
    let userName = '';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                ReceiversAPI
            ]
        });
        service = TestBed.inject(ReceiversAPI);
        httpController = TestBed.inject(HttpTestingController);
    });

    describe('getAllReceivers()', () => {
        it('should get all receivers list', () => {
            // When
            service.getAllReceivers().subscribe((response: any) => {
                expect(response).toEqual(ReceiversDetails.receiversDetails);
            });

            // Then
            const req = httpController.expectOne({
                method: 'GET',
                url: `${url}/users/${userName}/beneficiary`,
            });
            expect(req.cancelled).toBeFalsy();
            expect(req.request.responseType).toEqual('json');
            req.flush(ReceiversDetails.receiversDetails);
            httpController.verify();
        });

        // it('Error when get all receivers list', () => {
        //     // When
        //     const errorMessage = 'Error received';
        //     service.getAllReceivers().subscribe((res) => {
        //         fail(res);
        //     }, error => {
        //         expect(error).toEqual(errorMessage)
        //     });

        //     // Then
        //     const req = httpController.expectOne({
        //         method: 'GET',
        //         url: `${url}/users/${userName}/beneficiary`,
        //     });
        //     expect(req.cancelled).toBeFalsy();
        //     expect(req.request.responseType).toEqual('json');
        //     req.flush(errorMessage);
        //     httpController.verify();
        // });
    });

    describe('getReceiver()', () => {
        it('should get receiver by nick name', () => {
            // Given
            let nickName = 'test123';

            // When
            service.getReceiver(nickName).subscribe((res) => {
                expect(res).toEqual(ReceiversDetails.getReceiverDetails);
            });

            // Then
            const req = httpController.expectOne({
                method: 'GET',
                url: `${url}/users/${userName}/beneficiary/${nickName}`,
            });
            expect(req.cancelled).toBeFalsy();
            expect(req.request.responseType).toEqual('json');
            req.flush(ReceiversDetails.getReceiverDetails);
            httpController.verify();
        });
    });

    describe('addReceiver()', () => {
        it('should add receiver details', () => {
            // When
            service.addReceiver(ReceiversDetails.addReceiverDetails.beneficiary).subscribe((res) => {
                expect(res).toEqual(ReceiversDetails.addReceiverDetails);
            });

            // Then
            const req = httpController.expectOne({
                method: 'POST',
                url: `${url}/users/${userName}/beneficiary`,
            });
            expect(req.cancelled).toBeFalsy();
            expect(req.request.responseType).toEqual('json');
            req.flush(ReceiversDetails.addReceiverDetails);
            httpController.verify();
        });
    });

    describe('modifyReceiver()', () => {
        it('should modify receiver details', () => {
            // Given
            let receiverDetails = {
                firstName: "Altimetrik",
                lastName: "Pune",
                country: "India",
                bankAccountNumber: 1234567,
                iban: "IDFC004",
                nickName: "test123"
            }

            // When
            service.modifyReceiver(receiverDetails).subscribe((res) => {
                expect(res).toEqual(ReceiversDetails.modifyReceiverDetails);
            });

            // Then
            const req = httpController.expectOne({
                method: 'PUT',
                url: `${url}/users/${userName}/beneficiary/${receiverDetails.nickName}`,
            });
            expect(req.cancelled).toBeFalsy();
            expect(req.request.responseType).toEqual('json');
            req.flush(ReceiversDetails.modifyReceiverDetails);
            httpController.verify();
        });
    });

    describe('deleteReceiver()', () => {
        it('should delete receiver details', () => {
            // Given
            let nickName = 'test123'

            // When
            service.deleteReceiver(nickName).subscribe((res) => {
                expect(res).toEqual(ReceiversDetails.deleteReceiver);
            });

            // Then
            const req = httpController.expectOne({
                method: 'DELETE',
                url: `${url}/users/${userName}/beneficiary/${nickName}`,
            });
            expect(req.cancelled).toBeFalsy();
            expect(req.request.responseType).toEqual('json');
            expect(ReceiversDetails.deleteReceiver.beneficiaries.length).toBe(0);
            req.flush(ReceiversDetails.deleteReceiver);
            httpController.verify();
        });
    });
});
