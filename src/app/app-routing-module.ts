import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Test } from './test/test';
import { Login } from './login/login';
import { AuthGuard } from './guards/auth-guard';
import { GuestGuard } from './guards/guest-guard';
import { AuthLayout } from './auth-layout/auth-layout';
import { Home } from './home/home';
import { Applications } from './components/applications/applications';
import { Index } from './components/applications/index';
import { Show } from './components/applications/show/show';
import { ApplicationsResolver } from './components/applications/resolvers/ApplicationsResolver';
import { ApplicationResolver } from './components/applications/resolvers/ApplicationResolver';

const routes: Routes = [
  {
    path: '',
    component: AuthLayout,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: Home,
        canActivate: [AuthGuard]
      },
      {
        path: 'test',
        component: Test,
        canActivate: [AuthGuard]
      },
      {
        path: 'applications',
        component: Applications,
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: Index,
            canActivate: [AuthGuard],
            resolve: { ApplicationsResolver }
          },
          {
            path: ':id',
            component: Show,
            canActivate: [AuthGuard],
            resolve: { ApplicationResolver }
          },

        ]
      },
    ]
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
