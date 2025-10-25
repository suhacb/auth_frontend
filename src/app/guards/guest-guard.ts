import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthStore } from '../store/auth.store';

@Injectable({providedIn: 'root'})

export class GuestGuard implements CanActivate {
  constructor(private authStore: AuthStore, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      // Clear all tokens
      this.authStore.reset();
      return true; // allow access to login
    }

    // Access token exists in local storage → sync authStore
    const token = this.authStore.accessToken(); // readonly signal
    if (!token) {
      this.authStore.setToken({
        accessToken: localStorage.getItem('access_token'),
        tokenType: localStorage.getItem('token_type'),
        expiresIn: Number(localStorage.getItem('expires_in')) || null,
        refreshToken: localStorage.getItem('refresh_token'),
        refreshExpiresIn: Number(localStorage.getItem('refresh_expires_in')) || null,
        scope: localStorage.getItem('scope'),
        idToken: localStorage.getItem('id_token'),
        notBeforePolicy: localStorage.getItem('not_before_policy'),
        sessionState: localStorage.getItem('session_state'),
      });
    }

    return this.router.parseUrl('/test');
  }
}