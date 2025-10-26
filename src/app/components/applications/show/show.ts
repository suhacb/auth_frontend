import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationStore } from '../store/applications.store';

@Component({
  selector: 'app-show',
  standalone: false,
  templateUrl: './show.html',
  styleUrl: './show.scss'
})
export class Show implements OnInit {
  applicationId: number;

  constructor(private route: ActivatedRoute, public store: ApplicationStore) {
    this.applicationId = parseInt(this.route.snapshot.paramMap.get('id') ?? '0');
  }
  ngOnInit(): void {
    this.store.getApplication(this.applicationId);
  }
}
