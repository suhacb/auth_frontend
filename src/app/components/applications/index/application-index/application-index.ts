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
  @Output() onShowEvent = new EventEmitter<string | number | null>();
  @Output() onDeleteEvent = new EventEmitter<Application>();

  onShowClick(id: string | number | null) {
    if (id) {
      this.onShowEvent.emit(id);
    }
  }

  onDeleteClick(application: Application) {
    this.onDeleteEvent.emit(application);
  }
}
