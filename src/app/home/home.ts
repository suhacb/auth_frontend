import { Component } from '@angular/core';
import { AppStore } from '../store/app.store';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  constructor(public store: AppStore) {}
}
