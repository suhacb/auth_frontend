import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AppStore } from '../store/app.store';
import { ApiErrorResult } from '../core/http/api-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: AppStore, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    let accessTokenInLocalStorage = localStorage.getItem('access_token');
    let accessTokenInAuthStore = this.store.auth.accessToken();
    
    /**
     * Populate AuthStore from localStorage if token exists but store is empty.
     * Ensures store is restored after a hard page reload.
     */
    if (accessTokenInLocalStorage && !accessTokenInAuthStore) {
      this.store.auth.setToken({
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
      // Repopulate local variables of access token.
      accessTokenInLocalStorage = localStorage.getItem('access_token');
      accessTokenInAuthStore = this.store.auth.accessToken();
    }

    // If either is missing → redirect to login
    if (!accessTokenInLocalStorage || !accessTokenInAuthStore) {
      return this.router.parseUrl('/login');
    }    

    // If tokens don't match → redirect to login
    if (accessTokenInLocalStorage !== accessTokenInAuthStore) {
      this.store.auth.setToken();
      return this.router.parseUrl('/login');
    }

    // As frontend tokens seem to be OK, we ask the backend if token is valid.
    const accessTokenIsValid = await this.store.auth.validateAccessToken();
for (const [key, value] of Object.entries(accessTokenIsValid)) {
  console.log(`${key}:`, value);
}

    if (accessTokenIsValid === true) {
      return true;
    }

    this.store.auth.setToken();
    return this.router.parseUrl('/login');
  }
}