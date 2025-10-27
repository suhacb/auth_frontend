import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Application } from '../../models/application';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-application-delete-modal',
  standalone: false,
  templateUrl: './application-delete-modal.html',
  styleUrl: './application-delete-modal.scss'
})
export class ApplicationDeleteModal {
  public showDeleteModal: boolean = false;

  constructor(private dialogRef: MatDialogRef<ApplicationDeleteModal>, @Inject(MAT_DIALOG_DATA) public data: {application: Application}) {}

  @Output() deleteApplicationEvent = new EventEmitter<Application>();

  onCloseClick(): void {
    this.dialogRef.close(false);
  }

  onDeleteApplicationClick(application: Application): void {
    this.dialogRef.close(application);
    //this.deleteApplicationEvent.emit(application);
  }
}
