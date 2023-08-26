import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiversRoutingModule } from './receivers-routing.module';
import { MaterialModule } from '../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ReceiverListComponent } from './receivers-list/receiver-list.component';
import { AddReceiverComponent } from './add-receiver/add-receiver.component';
import { HttpClientModule } from '@angular/common/http';
import { ReceiversAPI } from './receivers.api';
import { SnackBarService } from '../shared/services/snack-bar.service';

@NgModule({
    declarations: [
        ReceiverListComponent,
        AddReceiverComponent
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
        SnackBarService
    ]
})
export class ReceiversModule { }
