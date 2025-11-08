import { Component } from '@angular/core';
import { AuthStore } from '../login/store/auth.store';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  constructor(public store: AuthStore) {}
}
