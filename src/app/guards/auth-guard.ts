import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable } from 'rxjs';
import { AuthStore } from '../modules/login/store/auth.store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: AuthStore, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> {
    let accessTokenInLocalStorage = localStorage.getItem('access_token');
    let accessTokenInAuthStore = this.store.accessToken();
    
    /**
     * Populate AuthStore from localStorage if token exists but store is empty.
     * Ensures store is restored after a hard page reload.
     */
    if (accessTokenInLocalStorage && !accessTokenInAuthStore) {
      this.store.setToken({
        accessToken: localStorage.getItem('access_token') ?? '',
        tokenType: localStorage.getItem('token_type') ?? '',
        expiresIn: Number(localStorage.getItem('expires_in')) ?? 0,
        refreshToken: localStorage.getItem('refresh_token') ?? '',
        refreshExpiresIn: Number(localStorage.getItem('refresh_expires_in')) ?? 0,
        scope: localStorage.getItem('scope') ?? '',
        idToken: localStorage.getItem('id_token') ?? '',
        notBeforePolicy: localStorage.getItem('not_before_policy') ?? '',
        sessionState: localStorage.getItem('session_state') ?? '',
      });

      // Repopulate local variables of access token.
      accessTokenInLocalStorage = localStorage.getItem('access_token');
      accessTokenInAuthStore = this.store.accessToken();
    }

    // If either is missing → redirect to login
    if (!accessTokenInLocalStorage || !accessTokenInAuthStore) {
      return this.router.parseUrl('/login');
    }    

    // If tokens don't match → redirect to login
    if (accessTokenInLocalStorage !== accessTokenInAuthStore) {
      this.store.setToken();
      return this.router.parseUrl('/login');
    }

    // As frontend tokens seem to be OK, we ask the backend if token is valid.
    return this.store.validateAccessToken().pipe(
      map((isValid) => {
        if (isValid === true) {
          return true;
        }
        return this.router.parseUrl('/login');
      }
    ));
  }
}