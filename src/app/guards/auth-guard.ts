import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppStore } from '../store/app.store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: AppStore, private router: Router) {}

  canActivate(): boolean {
    const auth = this.store.auth;
    // const data = this.store.getData();

    // if (!data) {
      // Redirect back if no data is stored
    //  this.router.navigate(['/login']);
    //   return false;
    // }

    return true;
  }
}