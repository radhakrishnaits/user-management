import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceiverListComponent } from './receivers-list/receiver-list.component';
import { AddReceiverComponent } from './add-receiver/add-receiver.component';

const routes: Routes = [
  { path: '', component: ReceiverListComponent, pathMatch: 'full' },
  { path: 'add-receiver', component: AddReceiverComponent },
  { path: 'modify-receiver/:id', component: AddReceiverComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceiversRoutingModule { }
