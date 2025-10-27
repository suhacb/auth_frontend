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
  @Output() onDeleteEvent = new EventEmitter<number>();

  onShowClick(id: number) {
    this.onShowEvent.emit(id);
  }

  onDeleteClick(id: number) {
    this.onDeleteEvent.emit(id);
  }
}
