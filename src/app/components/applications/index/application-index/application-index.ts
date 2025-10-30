import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Application } from '../../models/application';

@Component({
  selector: 'app-application-index',
  standalone: false,
  templateUrl: './application-index.html',
  styleUrl: './application-index.scss'
})
export class ApplicationIndex {
  @Input() applications: Application[] = [];
  @Output() onShowEvent = new EventEmitter<number>();
  @Output() onDeleteEvent = new EventEmitter<Application>();

  onShowClick(id: number) {
    if (id) {
      this.onShowEvent.emit(id);
    }
  }

  onDeleteClick(application: Application) {
    this.onDeleteEvent.emit(application);
  }
}
