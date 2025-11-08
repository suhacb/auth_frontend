import { Component, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationStore } from '../store/applications.store';
import { ApplicationForm } from '../components/application-form/application-form';
import { Application } from '../contracts/Application';
import { ApplicationMapper } from '../models/ApplicationMapper';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmCancelDialog } from '../../../core/ConfirmCancelDialog/confirm-cancel-dialog';

@Component({
  selector: 'app-show',
  standalone: false,
  templateUrl: './show.html',
  styleUrl: './show.scss'
})
export class Show {
  public mode = signal<'show' | 'edit' | 'create'>('show');
  public application = signal<Application>(new ApplicationMapper().make());
  public backendErrors: Record<string, string[]> | null = null;
  
  constructor(public store: ApplicationStore, private router: Router, private dialog: MatDialog) {
    this.application.set(this.store.show());
  }
  
  @ViewChild('applicationForm') applicationForm!: ApplicationForm;

  handleApplicationUpdate(updatedApplication: Application): void {
    const confirmCancelDialogRef = this.dialog.open(ConfirmCancelDialog, {
      width: '600px',
      disableClose: true,
      data: {
        title: 'Update Application',
        content: 'Do you really want to update the application?'
      }
    });

    const modalInstance = confirmCancelDialogRef.componentInstance;
    modalInstance.confirm.subscribe(() => {
      this.backendErrors = {};
      this.applicationForm.backendErrors = this.backendErrors;      
      const updatedApplication = this.applicationForm.getValue();
      this.store.updateApplication(this.application(), updatedApplication).subscribe({
        next: () => {
          this.mode.set('show');
          this.application.set(this.store.show());
          confirmCancelDialogRef.close();
        },
        error: (error) => {
          this.backendErrors = error.error.errors || {};
          this.applicationForm.backendErrors = this.backendErrors;
        }
      });
    });
    
    modalInstance.cancel.subscribe(() => {
      confirmCancelDialogRef.close();
    });
  }

  handleCancelApplicationEdit(): void {
    const confirmCancelDialogRef = this.dialog.open(ConfirmCancelDialog, {
      width: '600px',
      disableClose: true,
      data: {
        title: 'Cancel Update Application',
        content: 'Do you really want to cancel updating the application?'
      }
    });

    const modalInstance = confirmCancelDialogRef.componentInstance;
    modalInstance.confirm.subscribe(() => {
      this.applicationForm.resetToOriginal();
      this.backendErrors = {};
      this.applicationForm.backendErrors = this.backendErrors;
      this.mode.set('show');
      confirmCancelDialogRef.close();
    });
    modalInstance.cancel.subscribe(() => {
      confirmCancelDialogRef.close();
    });
  }
}
