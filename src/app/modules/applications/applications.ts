import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationStore } from './store/applications.store';

@Component({
  selector: 'app-applications',
  standalone: false,
  templateUrl: './applications.html',
  styleUrl: './applications.scss'
})
export class Applications {
  constructor(private router: Router, public store: ApplicationStore) {}

  isIndexActive(): boolean {
    return this.router.isActive('/applications', {
      paths: 'exact',
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }
}
