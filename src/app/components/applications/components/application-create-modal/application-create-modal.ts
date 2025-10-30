import { Component, EventEmitter, Inject, Input, Output, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Application } from '../../models/application';
import { ApplicationForm } from '../application-form/application-form';
import { ApplicationResource } from '../../contracts/ApplicationResource';

@Component({
  selector: 'app-application-create-modal',
  standalone: false,
  templateUrl: './application-create-modal.html',
  styleUrl: './application-create-modal.scss'
})
export class ApplicationCreateModal {

  public application: ApplicationResource = new Application().toRaw();

  constructor(private dialogRef: MatDialogRef<ApplicationCreateModal>) {}

  @Output() deleteApplicationEvent = new EventEmitter<string>()
  @ViewChild(ApplicationForm) applicationForm!: ApplicationForm;

  onCloseClick(): void {
    this.dialogRef.close(false);
  }

  onCreateApplicationClick(): void {
    const application = new Application({rawData: this.applicationForm.value});
    this.dialogRef.close(application.toApi());
  }
}
