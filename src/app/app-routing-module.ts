import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Test } from './modules/test/test';
import { Login } from './modules/login/pages/login';
import { AuthGuard } from './guards/auth-guard';
import { GuestGuard } from './guards/guest-guard';
import { AuthLayout } from './modules/auth-layout/auth-layout';
import { Home } from './modules/home/home';
import { Applications } from './modules/applications/applications';
import { ApplicationsIndex } from './modules/applications/pages/index/index';
import { ApplicationsShow } from './modules/applications/pages/show/show';
import { ApplicationsResolver } from './modules/applications/resolvers/ApplicationsResolver';
import { ApplicationResolver } from './modules/applications/resolvers/ApplicationResolver';
import { LoginResolver } from './modules/login/resolvers/LoginResolver';

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
            component: ApplicationsIndex,
            canActivate: [AuthGuard],
            resolve: { ApplicationsResolver }
          },
          {
            path: ':id',
            component: ApplicationsShow,
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
    canActivate: [GuestGuard],
    resolve: { LoginResolver }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
