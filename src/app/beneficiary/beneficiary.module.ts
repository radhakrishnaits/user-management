import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeneficiaryListComponent } from './beneficiary-list/beneficiary-list.component';
import { AddBeneficiaryComponent } from './add-beneficiary/add-beneficiary.component';
import { ModifyBeneficiaryComponent } from './modify-beneficiary/modify-beneficiary.component';
import { BeneficiaryRoutingModule } from './beneficiary-routing.module';
import { MaterialModule } from '../shared/material.module';

@NgModule({
    declarations: [
        BeneficiaryListComponent,
        AddBeneficiaryComponent,
        ModifyBeneficiaryComponent
    ],
    imports: [
        CommonModule,
        BeneficiaryRoutingModule,
        MaterialModule
    ]
})
export class BebeficiaryModule { }
