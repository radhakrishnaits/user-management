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

@NgModule({
    imports: [
        MatTableModule,
        MatTabsModule,
        MatPaginatorModule
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
        MatDialogModule
    ]
})

export class MaterialModule { }
