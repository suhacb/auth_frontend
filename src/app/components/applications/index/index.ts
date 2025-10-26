import { Component, OnInit } from '@angular/core';
import { ApplicationStore } from '../store/applications.store';

@Component({
  selector: 'app-index',
  standalone: false,
  templateUrl: './index.html',
  styleUrl: './index.scss',
})

export class Index implements OnInit {
  constructor(public store: ApplicationStore) {}
  
  ngOnInit(): void {
    this.store.getIndex();
  }
}
