import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { MaterialModule } from '../material.module';
import { ReceiversModule } from 'src/app/receivers/receivers.module';
import { TransactionHistoryModule } from 'src/app/transaction-history/transaction-history.module';
import { CommonListRoutingModule } from './common-list.routing.module';

@NgModule({
    declarations: [
        ListComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReceiversModule,
        TransactionHistoryModule,
        CommonListRoutingModule
    ]
})
export class CommonListModule { }
