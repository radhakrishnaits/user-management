import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModifyReceiverComponent } from '../modify-receiver/modify-receiver.component';
import { AddReceiverComponent } from '../add-receiver/add-receiver.component';

@Component({
  selector: 'app-receiver-list',
  templateUrl: './receiver-list.component.html',
  styleUrls: ['./receiver-list.component.scss']
})

export class ReceiverListComponent {
  displayedColumns: string[] = ['benFirstName', 'benLastName', 'benCountry', 'mobileNumber', 'bankAccountNumber', 'iban', 'update', 'delete'];
  receiverData = [
    { benFirstName: 'Hydrogen', benLastName: 'Test', benCountry: 'India', mobileNumber: '12345678', bankAccountNumber: 'ICICI', iban: 'ICIC00098009', id: '0' },
    { benFirstName: 'Helium', benLastName: 'Test', benCountry: 'India', mobileNumber: '12345678', bankAccountNumber: 'ICICI', iban: 'ICIC00098009', id: '1' },
    { benFirstName: 'Lithium', benLastName: 'Test', benCountry: 'India', mobileNumber: '12345678', bankAccountNumber: 'ICICI', iban: 'ICIC00098009', id: '2' },
    { benFirstName: 'Beryllium', benLastName: 'Test', benCountry: 'India', mobileNumber: '12345678', bankAccountNumber: 'ICICI', iban: 'ICIC00098009', id: '3' },
    { benFirstName: 'Boron', benLastName: 'Test', benCountry: 'India', mobileNumber: '12345678', bankAccountNumber: 'ICICI', iban: 'ICIC00098009', id: '4' }
  ];
  @ViewChild('deleteReceiver') deleteReceiver: any = ElementRef;

  constructor(private dialog: MatDialog) {
  }

  openAddReceiverModel() {
    const dialogRef = this.dialog.open(AddReceiverComponent, { height: 'auto' });
    dialogRef.afterClosed().subscribe(result => {
      result['id'] = (this.receiverData.length).toString();
      this.receiverData.push(result);
    })
  }

  modifyBeneficiary() {
    const dialogRef = this.dialog.open(ModifyReceiverComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }

  openConfirmationModel(id: string) {
    const dialogRef = this.dialog.open(this.deleteReceiver, { width: '350px' });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.removeBeneficiary(id);
    })
  }

  removeBeneficiary(id: string) {
    this.receiverData.splice(parseInt(id), 1);
    console.log('Element removed >> ', this.receiverData);
  }
}
