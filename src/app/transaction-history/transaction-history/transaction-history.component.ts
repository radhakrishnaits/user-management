import { Component } from '@angular/core';
import { TransactionHistoryAPI } from '../transactions.api';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent {
  public history: any[] = [];
  public showDetails: boolean[] = [];

  constructor(private transactionApi: TransactionHistoryAPI, private snackBar: SnackBarService) { }

  ngOnInit() {
    this.getTransactions();
  }

  getTransactions() {
    this.transactionApi.getAllTransactions().subscribe(response => {
      this.history = response['transactions'];
      this.getProfileIcon();
    }, error => {
      this.snackBar.openErrorSnackBar('Error while fetching transaction history', '');
    });
  }

  getProfileIcon() {
    this.history.forEach((user: any) => {
      user['avatarIcon'] = user?.receiverFirstName && user?.receiverLastName ? (user?.receiverFirstName?.charAt(0) + '' + user?.receiverLastName?.charAt(0)).toUpperCase() : "WU";
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
