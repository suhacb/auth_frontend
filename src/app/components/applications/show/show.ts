import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationStore } from '../store/applications.store';
import { Application } from '../models/application';

@Component({
  selector: 'app-show',
  standalone: false,
  templateUrl: './show.html',
  styleUrl: './show.scss'
})
export class Show implements OnInit {
  applicationId: number;

  constructor(private route: ActivatedRoute, public store: ApplicationStore, private router: Router) {
    this.applicationId = parseInt(this.route.snapshot.paramMap.get('id') ?? '0');
  }

  async ngOnInit(): Promise<void> {
    this.store.setShow(new Application());
    const app = await this.store.getApplication(this.applicationId);
    if (!this.store.show()) {
        this.router.navigate(['/applications']);
    }
  }
}
