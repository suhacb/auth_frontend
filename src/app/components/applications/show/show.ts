import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationStore } from '../store/applications.store';
import { Application } from '../models/application';
import { ApplicationResource } from '../contracts/ApplicationResource';

@Component({
  selector: 'app-show',
  standalone: false,
  templateUrl: './show.html',
  styleUrl: './show.scss'
})
export class Show {
  public application: ApplicationResource;

  constructor(public store: ApplicationStore) {
    this.application = this.store.show();
  }
}
