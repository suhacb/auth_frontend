import { Component } from '@angular/core';
import { AuthStore } from '../store/auth.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: false,
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss'
})
export class AuthLayout {
  constructor(public store: AuthStore, private router: Router) {}

  logout() {
    this.store.reset();
    this.router.navigate(['/login']);
  }
}
