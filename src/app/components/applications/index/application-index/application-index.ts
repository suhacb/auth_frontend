import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApplicationResource } from '../../contracts/ApplicationResource';

@Component({
  selector: 'app-application-index',
  standalone: false,
  templateUrl: './application-index.html',
  styleUrl: './application-index.scss'
})
export class ApplicationIndex {
  @Input() applications: ApplicationResource[] = [];
  @Output() onShowEvent = new EventEmitter<number>();
  @Output() onDeleteEvent = new EventEmitter<ApplicationResource>();

  onShowClick(id: number | null) {
    if (id) {
      this.onShowEvent.emit(id);
    }
  }

  onDeleteClick(application: ApplicationResource) {
    this.onDeleteEvent.emit(application);
  }
}
