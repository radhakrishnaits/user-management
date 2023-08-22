import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddBeneficiaryComponent } from '../add-beneficiary/add-beneficiary.component';
import { ModifyBeneficiaryComponent } from '../modify-beneficiary/modify-beneficiary.component';

@Component({
  selector: 'app-beneficiary-list',
  templateUrl: './beneficiary-list.component.html',
  styleUrls: ['./beneficiary-list.component.scss']
})

export class BeneficiaryListComponent {
  displayedColumns: string[] = ['position', 'name', 'bank', 'ifsc', 'update', 'delete'];
  beneficiaryData = [
    { position: 1, name: 'Hydrogen', bank: 'ICICI', ifsc: 'ICIC00098009', id: '1' },
    { position: 2, name: 'Helium', bank: 'ICICI', ifsc: 'ICIC00098009', id: '2' },
    { position: 3, name: 'Lithium', bank: 'ICICI', ifsc: 'ICIC00098009', id: '3' },
    { position: 4, name: 'Beryllium', bank: 'ICICI', ifsc: 'ICIC00098009', id: '4' },
    { position: 5, name: 'Boron', bank: 'ICICI', ifsc: 'ICIC00098009', id: '5' }
  ];
  @ViewChild('deleteBeneficiary') deleteBeneficiary: any = ElementRef;

  constructor(private dialog: MatDialog) {
  }

  addBeneficiary() {
    const dialogRef = this.dialog.open(AddBeneficiaryComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }

  modifyBeneficiary() {
    const dialogRef = this.dialog.open(ModifyBeneficiaryComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }

  removeBeneficiary() {
    const dialogRef = this.dialog.open(this.deleteBeneficiary, { width: '350px' });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }
}
