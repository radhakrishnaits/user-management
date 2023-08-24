import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'list/:type', loadChildren: () => import('./shared/common-list/common-list.module').then(m => m.CommonListModule), data: { title: 'Receivers' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
