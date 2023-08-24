import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';

@NgModule({
    declarations: [
        TransactionHistoryComponent
    ],
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [
        TransactionHistoryComponent
    ]
})
export class TransactionHistoryModule { }
