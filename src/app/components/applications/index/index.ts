import { Component, Input, OnInit } from '@angular/core';
import { ApplicationStore } from '../store/applications.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: false,
  templateUrl: './index.html',
  styleUrl: './index.scss',
})

export class Index implements OnInit {
  constructor(public store: ApplicationStore, private router: Router) {}
  
  async ngOnInit(): Promise<void> {
    this.store.setIndex([]);
    await this.store.getIndex();
  }

  async show(id: number): Promise<void> {
    const response = await this.store.getApplication(id);
    if (response) {
      this.router.navigate(['/applications', id]);
    }
  }

  delete(id: number) {
    console.log('delete: ' + id);
  }
}
