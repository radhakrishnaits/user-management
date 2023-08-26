import { Component } from '@angular/core';
import { TransactionHistoryAPI } from '../transactions.api';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent {
  history: any;

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
