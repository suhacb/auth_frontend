import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarErrorComponent } from '../shared/snackbar-error/snackbar-error';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  onSubmit(): void {
    const { username, password } = this.loginForm.value;
    const url = 'http://localhost:9025/api/login';
    const body = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };
  
    this.http.post(url, body, { observe: 'response' }).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log('Status code:', response.status);
        console.log('Response body:', response.body);
      },
      error: (err) => {
        this.handleApiErrors(err);
        if (err.status >= 400 && err.status < 500) {
          // assuming backend sends { "username": "Error message" }
          return;
        }
        console.error('Error status:', err.status);
        console.error('Error body:', err.error);
      }
    });

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
      let message: string = 'Server-side error ' + errors.status + ': ' + errors.error?.error_message;
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