import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarErrorComponent } from '../shared/snackbar-error/snackbar-error';
import { SnackbarSuccessComponent } from '../shared/snackbar-success/snackbar-success';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AppStore } from '../store/app.store';
import { Token } from './token';
import { applyValidationErrors } from '../core/http/form-error-helper';


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
    const result = await this.store.auth.login(this.loginForm.value.username, this.loginForm.value.password);

    if (result === true) {
      this.router.navigate(['/']);
      return;
    }

    if (result && typeof result === 'object' && result.validationErrors) {
      applyValidationErrors(this.loginForm, result.validationErrors);
    }
  }

}