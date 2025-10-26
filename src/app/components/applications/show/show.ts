import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show',
  standalone: false,
  templateUrl: './show.html',
  styleUrl: './show.scss'
})
export class Show implements OnInit {
  applicationId: string | null = null;

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.applicationId = this.route.snapshot.paramMap.get('id');
  }
}
