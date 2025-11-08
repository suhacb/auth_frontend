import { Component, EventEmitter, Inject, Input, Output, Signal, signal, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApplicationForm } from '../application-form/application-form';
import { Application } from '../../contracts/Application';
import { ApplicationMapper } from '../../models/ApplicationMapper';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-application-create-modal',
  standalone: false,
  templateUrl: './application-create-modal.html',
  styleUrl: './application-create-modal.scss'
})
export class ApplicationCreateModal {
  public mode = signal<'show' | 'edit' | 'create'>('create');
  public application: Application = new ApplicationMapper().make();
  @Input() backendErrors!: Record<string, string[]> | null;

  constructor(private dialogRef: MatDialogRef<ApplicationCreateModal>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  @ViewChild(ApplicationForm) applicationForm!: ApplicationForm;

  @Output() storeApplication = new EventEmitter<Application>;
  @Output() cancelCreateApplication = new EventEmitter;

  storeOrUpdateApplication(newApplication: Application): void {
    this.storeApplication.emit(newApplication);
  }

  onUpdate(newApplication: Application) {
    this.storeApplication.emit(newApplication);
  }

  onCreateApplicationCancel() {
    this.cancelCreateApplication.emit();
  }

  onModeChange(mode: 'show' | 'edit' | 'create') {
    console.log('mode change');
  }

  onCloseClick(): void {
    this.dialogRef.close(false);
  }

  onCreateApplicationClick(): void {
    // const application = new ApplicationMapper().toApp(this.applicationForm.getValue());
    // this.dialogRef.close(new ApplicationMapper().toApi(application));
  }

  getError(field: string): string | null {
    return this.backendErrors?.[field]?.join(' ') || null;
  }
}
