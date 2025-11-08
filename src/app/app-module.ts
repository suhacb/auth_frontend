import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { SpinnerInterceptor } from './shared/spinner/spinner.interceptor';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatFabButton, MatMiniFabButton } from '@angular/material/button';
import { Test } from './test/test';
import { MatMenuModule } from '@angular/material/menu';
import { Login } from './login/login';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Spinner } from './shared/spinner/spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarErrorComponent } from './shared/snackbar-error/snackbar-error';
import { SnackbarSuccessComponent } from './shared/snackbar-success/snackbar-success';
import { appHeadersInterceptor } from './core/http/headers.interceptor';
import { AuthLayout } from './auth-layout/auth-layout';
import { Home } from './home/home';
import { LogoutModal } from './modals/logout-modal/logout-modal';
// Material modules
import { MatDialogModule } from '@angular/material/dialog';
import { Applications } from './modules/applications/applications';
import { MainMenu } from './auth-layout/main-menu/main-menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ApplicationsIndex } from './modules/applications/pages/index/index';
import { ApplicationsShow } from './modules/applications/pages/show/show';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { ApplicationForm } from './modules/applications/components/application-form/application-form';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ApplicationIndex } from './modules/applications/pages/index/application-index/application-index';
import { ApplicationCreateModal } from './modules/applications/components/application-create-modal/application-create-modal';
import { ConfirmCancelDialog } from './core/ConfirmCancelDialog/confirm-cancel-dialog';

@NgModule({
  declarations: [
    App,
    Test,
    Login,
    Spinner,
    SnackbarErrorComponent,
    SnackbarSuccessComponent,
    AuthLayout,
    Home,
    LogoutModal,
    Applications,
    MainMenu,
    ApplicationsIndex,
    ApplicationsShow,
    ApplicationForm,
    ApplicationIndex,
    ApplicationCreateModal,
    ConfirmCancelDialog,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatTableModule,
    MatOptionModule,
    MatSelectModule,
    MatFabButton,
    MatMiniFabButton
],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(
      withInterceptors([
        appHeadersInterceptor,
        SpinnerInterceptor
      ])
    )
  ],
  bootstrap: [App]
})
export class AppModule { }