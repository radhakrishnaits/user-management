import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiversRoutingModule } from './receivers-routing.module';
import { MaterialModule } from '../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ReceiverListComponent } from './receivers-list/receiver-list.component';
import { AddReceiverComponent } from './add-receiver/add-receiver.component';
import { ModifyReceiverComponent } from './modify-receiver/modify-receiver.component';

@NgModule({
    declarations: [
        ReceiverListComponent,
        AddReceiverComponent,
        ModifyReceiverComponent
    ],
    imports: [
        CommonModule,
        ReceiversRoutingModule,
        MaterialModule,
        ReactiveFormsModule
    ],
    exports: [
        ReceiverListComponent
    ]
})
export class ReceiversModule { }
