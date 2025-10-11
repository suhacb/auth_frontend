import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerInterceptor } from './shared/spinner/spinner.interceptor';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
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



@NgModule({
  declarations: [
    App,
    Test,
    Login,
    Spinner,
    SnackbarErrorComponent
  ],
  imports: [
    BrowserModule,
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
    MatSnackBarModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }
  ],
  bootstrap: [App]
})
export class AppModule { }