import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiversRoutingModule } from './receivers-routing.module';
import { MaterialModule } from '../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ReceiverListComponent } from './receivers-list/receiver-list.component';
import { AddReceiverComponent } from './add-receiver/add-receiver.component';
import { ModifyReceiverComponent } from './modify-receiver/modify-receiver.component';
import { HttpClientModule } from '@angular/common/http';
import { ReceiversAPI } from './receivers.api';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

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
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [
        ReceiversAPI,
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2000 } }
    ]
})
export class ReceiversModule { }
