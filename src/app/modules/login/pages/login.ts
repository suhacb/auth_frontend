import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Token } from '../token';
// import { applyValidationErrors } from '../../core/http/form-error-helper';
import { AuthStore } from '../store/auth.store';


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
    public store: AuthStore,
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

  onSubmit() {
    const result = this.store.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        const errors = error.error.errors;
        this.loginForm.setErrors(error.error.errors);
        if (errors.username) {
          this.loginForm.get('username')?.setErrors({ backend: errors.username });
        }

        if (errors.password) {
          this.loginForm.get('password')?.setErrors({ backend: errors.password });
        }
      }
    });
  }

}