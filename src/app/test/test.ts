import { Component } from '@angular/core';
import { AppStore } from '../store/app.store';

@Component({
  selector: 'app-test',
  templateUrl: './test.html',
  styleUrl: './test.scss',
  standalone: false
})
export class Test {
  constructor(public store: AppStore) {}

}
