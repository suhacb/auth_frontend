import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Test } from './test/test';
import { Login } from './login/login';
import { AuthGuard } from './guards/auth-guard';
import { GuestGuard } from './guards/guest-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'test',
    component: Test,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: Login,
    canActivate: [GuestGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
