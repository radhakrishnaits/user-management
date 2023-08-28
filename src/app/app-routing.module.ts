import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './user/profile/profile.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'receivers', loadChildren: () => import('./receivers/receivers.module').then(m => m.ReceiversModule), data: { title: 'Receivers' } },
  { path: 'transaction-history', loadChildren: () => import('./transaction-history/transaction-history.module').then(m => m.TransactionHistoryModule), data: { title: 'Transaction History' } },
  { path: 'registration', component: RegistrationComponent },
  { path: 'user-profile', component: ProfileComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
