import { Component } from '@angular/core';
import { AuthStore } from '../login/store/auth.store';

@Component({
  selector: 'app-test',
  templateUrl: './test.html',
  styleUrl: './test.scss',
  standalone: false
})
export class Test {
  constructor(public store: AuthStore) {}

}
