import { Component } from '@angular/core';
import { TransactionHistoryAPI } from '../transactions.api';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent {
  history: any;
  avatarName = sessionStorage.getItem('firstName')?.charAt(0).toUpperCase() + '' + sessionStorage.getItem('lastName')?.charAt(0).toUpperCase();

  constructor(private transactionApi: TransactionHistoryAPI) { }

  ngOnInit() {
    this.getTransactions();
  }

  getTransactions() {
    this.transactionApi.getAllTransactions().subscribe(response => {
      this.history = response['transactions'];
      console.log(this.history);
    })
  }
}
