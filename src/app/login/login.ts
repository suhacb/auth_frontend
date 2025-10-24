import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarErrorComponent } from '../shared/snackbar-error/snackbar-error';
import { SnackbarSuccessComponent } from '../shared/snackbar-success/snackbar-success';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AppStore } from '../store/app.store';
import { Token } from './token';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss'
})

@Injectable({providedIn: 'root'})

export class Login implements OnInit {
  loginForm!: FormGroup;
  redirect_uri: string | null = null;
  
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    public store: AppStore,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
    
    this.route.queryParamMap.subscribe(params => {
      this.redirect_uri = params.get('redirect_uri') ?? 'http://localhost:9020';
    });
  }

  async onSubmit() {
    try {
      await this.store.auth.login(this.loginForm.value.username, this.loginForm.value.password);
      this.router.navigate(['/test']);
    } catch (err: unknown) {
      // Narrow the type
      if (err instanceof HttpErrorResponse) {
        console.error(err);
        this.handleApiErrors(err);
        if (err.status >= 400 && err.status < 500) {
          // assuming backend sends { "username": "Error message" }
          return;
        }
      } else {
        console.error('Unexpected error', err);
      }
    }
}

  handleApiErrors(errors: HttpErrorResponse) {
    let errorMessages:{
      username ?: string,
      password ?: string
    };
    // Handle 401 and 422
    if (errors.status === 422 || errors.status === 401) {
      errorMessages = errors.error.errors;
      if (errorMessages?.username) {
        this.loginForm.get('username')?.setErrors({ server: errors.error.errors?.username });
      }
      if (errorMessages?.password) {
        this.loginForm.get('password')?.setErrors({ server: errors.error.errors?.password });
      }
    } else {
      console.info(errors);
      let message: string = 'Server-side error ' + errors.status + ': ' + errors.error?.error;
      this.snackbar.openFromComponent(SnackbarErrorComponent, {
        data: { message },
        duration: 10000, // optional auto-dismiss
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['snackbar-error']
      });
    }
  }
}