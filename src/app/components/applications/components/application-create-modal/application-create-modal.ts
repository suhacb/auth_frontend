import { Component, EventEmitter, Inject, Input, Output, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApplicationForm } from '../application-form/application-form';
import { Application } from '../../contracts/Application';
import { ApplicationMapper } from '../../models/ApplicationMapper';

@Component({
  selector: 'app-application-create-modal',
  standalone: false,
  templateUrl: './application-create-modal.html',
  styleUrl: './application-create-modal.scss'
})
export class ApplicationCreateModal {

  public application: Application = new ApplicationMapper().make();

  constructor(private dialogRef: MatDialogRef<ApplicationCreateModal>) {}

  @Output() deleteApplicationEvent = new EventEmitter<string>()
  @ViewChild(ApplicationForm) applicationForm!: ApplicationForm;

  onCloseClick(): void {
    this.dialogRef.close(false);
  }

  onCreateApplicationClick(): void {
    // const application = new ApplicationMapper().toApp(this.applicationForm.getValue());
    // this.dialogRef.close(new ApplicationMapper().toApi(application));
  }
}
