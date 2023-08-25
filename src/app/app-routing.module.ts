import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {ProfileComponent} from "./user/profile/profile.component";

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'beneficiary', loadChildren: () => import('./beneficiary/beneficiary.module').then(m => m.BebeficiaryModule), data: { title: 'Beneficiary' } },
  { path: 'registration', component: RegistrationComponent, pathMatch: 'full'},
  { path: 'user-profile', component: ProfileComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
