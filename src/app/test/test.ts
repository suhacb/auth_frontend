import { Component } from '@angular/core';
import { AppStore } from '../shared/store';

@Component({
  selector: 'app-test',
  templateUrl: './test.html',
  styleUrl: './test.scss',
  standalone: false
})
export class Test {
  constructor(public store: AppStore) {}

  ngOnInit() {
    this.store.data$.subscribe(data => {
      console.log('Received store data:', data);
    });
  }
}
