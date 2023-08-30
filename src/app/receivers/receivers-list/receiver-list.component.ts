import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReceiversAPI } from '../receivers.api';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-receiver-list',
  templateUrl: './receiver-list.component.html',
  styleUrls: ['./receiver-list.component.scss']
})

export class ReceiverListComponent implements OnInit {
  public receiversDetails: any = []
  @ViewChild('deleteReceiver') deleteReceiver: any = ElementRef;
  public showDetails: boolean[] = [];

  constructor(private dialog: MatDialog, private snackBar: SnackBarService, private receiversApi: ReceiversAPI, private snackBarService: SnackBarService) { }

  ngOnInit() {
    this.getAllReceivers();
  }

  getAllReceivers() {
    this.receiversApi.getAllReceivers().subscribe(response => {
      this.receiversDetails = response['beneficiaries'];
      this.getProfileIcon();
    }, error => {
      this.snackBarService.openErrorSnackBar(error.message, '');
    })
  }

  openConfirmationModel(id: string) {
    const dialogRef = this.dialog.open(this.deleteReceiver, { width: '350px' });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.removeReceiver(id);
      }
    })
  }

  removeReceiver(id: string) {
    this.receiversApi.deleteReceiver(id).subscribe(response => {
      this.snackBar.openSuccessSnackBar('Receiver deleted successfully', '');
      this.getAllReceivers();
    }, error => {
      this.snackBarService.openErrorSnackBar('Error while deleting receiver', '');
    })
  }

  getProfileIcon() {
    this.receiversDetails.forEach((receiver: any) => {
      receiver['avatarIcon'] = receiver?.firstName && receiver?.lastName ? (receiver?.firstName?.charAt(0) + '' + receiver?.lastName?.charAt(0)).toUpperCase() : "WU";
    });
  }

  showReceiversDetails(id: string, index: number) {
    this.showDetails[index] = !this.showDetails[index];
    let recDetails = document.getElementById(id);
    if (recDetails?.style.display === "none") {
      recDetails!.style.display = "block";
    } else {
      recDetails!.style.display = "none";
    }
  }
}
