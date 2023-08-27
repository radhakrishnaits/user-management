import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { TransactionHistoryRoutingModule } from './transaction-history.routing.module';
import { TransactionHistoryAPI } from './transactions.api';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        TransactionHistoryComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        TransactionHistoryRoutingModule,
        HttpClientModule
    ],
    providers: [TransactionHistoryAPI]
})
export class TransactionHistoryModule { }
