import { Injectable, signal } from '@angular/core';
import { AuthStore } from '../modules/login/store/auth.store';


@Injectable({ providedIn: 'root' })
export class AppStore {
  constructor(
    public auth: AuthStore
  ) {}
}