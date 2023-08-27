import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReceiversAPI } from '../receivers.api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-receiver-list',
  templateUrl: './receiver-list.component.html',
  styleUrls: ['./receiver-list.component.scss']
})

export class ReceiverListComponent implements OnInit {
  receiversDetails: any = []
  @ViewChild('deleteReceiver') deleteReceiver: any = ElementRef;

  avatarName = sessionStorage.getItem('firstName')?.charAt(0).toUpperCase() +''+ sessionStorage.getItem('lastName')?.charAt(0).toUpperCase();

  constructor(private dialog: MatDialog, private snackBar: SnackBarService, private receiversApi: ReceiversAPI, private snackBarService: SnackBarService) { }

  ngOnInit() {
    this.getAllReceivers();
  }

  getAllReceivers() {
    this.receiversApi.getAllReceivers().subscribe(response => {
      this.receiversDetails = response['beneficiaries'];
    }, error => {
      console.log(error);
      this.snackBarService.openErrorSnackBar(error.message?.description, '');
    })
  }

  openConfirmationModel(id: string) {
    const dialogRef = this.dialog.open(this.deleteReceiver, { width: '350px' });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.removeBeneficiary(id);
      }
    })
  }

  removeBeneficiary(id: string) {
    this.receiversApi.deleteReceiver(id).subscribe(response => {
      this.snackBar.openSuccessSnackBar('Receiver deleted successfully', '');
      this.getAllReceivers();
    }, error => {
      console.log(error);
      this.snackBarService.openErrorSnackBar(error.message?.description, '');
    })
  }
}
