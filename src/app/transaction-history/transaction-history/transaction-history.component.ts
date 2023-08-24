import { Component } from '@angular/core';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent {
  history: any = [
    { benFirstName: 'Hydrogen', benLastName: 'Test', benCountry: 'India', mobileNumber: '12345678', bankAccountNumber: 'ICICI', iban: 'ICIC00098009', id: '0' },
    { benFirstName: 'Helium', benLastName: 'Test', benCountry: 'India', mobileNumber: '12345678', bankAccountNumber: 'ICICI', iban: 'ICIC00098009', id: '1' },
    { benFirstName: 'Lithium', benLastName: 'Test', benCountry: 'India', mobileNumber: '12345678', bankAccountNumber: 'ICICI', iban: 'ICIC00098009', id: '2' },
    { benFirstName: 'Beryllium', benLastName: 'Test', benCountry: 'India', mobileNumber: '12345678', bankAccountNumber: 'ICICI', iban: 'ICIC00098009', id: '3' },
    { benFirstName: 'Boron', benLastName: 'Test', benCountry: 'India', mobileNumber: '12345678', bankAccountNumber: 'ICICI', iban: 'ICIC00098009', id: '4' }
  ]
}
