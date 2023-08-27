import { NgModule } from "@angular/core";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatNativeDateModule} from "@angular/material/core";
import {HttpClientModule} from "@angular/common/http";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {MatSelectModule} from "@angular/material/select";
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
    imports: [
        MatTableModule,
        MatTabsModule,
        MatPaginatorModule,
    ],
    exports: [
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatTabsModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        MatDialogModule,
        MatListModule,
        MatGridListModule,
        MatMenuModule,
        MatDividerModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FormsModule,
        ReactiveFormsModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        MatMenuModule,
        HttpClientModule,
        MatSelectModule
    ],
  providers:[
  ]
})

export class MaterialModule { }
