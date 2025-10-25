import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AppStore } from '../store/app.store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: AppStore, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const accessTokenInLocalStorage = localStorage.getItem('access_token');
    const accessTokenInAuthStore = this.store.auth.accessToken();

    // If either is missing → redirect to login
    if (!accessTokenInLocalStorage || !accessTokenInAuthStore) {
      this.store.auth.setToken();
      return this.router.parseUrl('/login');
    }

    // If tokens don't match → redirect to login
    if (accessTokenInLocalStorage !== accessTokenInAuthStore) {
      this.store.auth.setToken();
      return this.router.parseUrl('/login');
    }

    return true;
  }
}