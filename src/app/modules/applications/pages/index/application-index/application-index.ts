import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Application } from '../../../contracts/Application';

@Component({
  selector: 'app-application-index',
  standalone: false,
  templateUrl: './application-index.html',
  styleUrl: './application-index.scss'
})
export class ApplicationIndex {
  @Input() applications: Application[] = [];
  @Output() onShowEvent = new EventEmitter<Application>();
  @Output() onDeleteEvent = new EventEmitter<Application>();

  onShowClick(application: Application | null) {
    if (application) {
      this.onShowEvent.emit(application);
    }
  }

  onDeleteClick(application: Application) {
    this.onDeleteEvent.emit(application);
  }
}
