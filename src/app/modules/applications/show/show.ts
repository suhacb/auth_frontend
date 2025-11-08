import { Component, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationStore } from '../store/applications.store';
import { ApplicationForm } from '../components/application-form/application-form';
import { Application } from '../contracts/Application';
import { ApplicationMapper } from '../models/ApplicationMapper';
import { MatDialog } from '@angular/material/dialog';
import { ApplicationUpdateCancelModal } from './application-update-cancel-modal/application-update-cancel-modal';
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

    // Show confirm update dialog
    // const dialogRef = this.dialog.open(ApplicationUpdateConfirmModal, {
    //   width: '600px',
    //   disableClose: true
    // });
// 
    // dialogRef.afterClosed().subscribe((result: boolean) => {
    //   if(result) {
    // });
  }

  handleCancelApplicationEdit(): void {
    const dialogRef = this.dialog.open(ApplicationUpdateCancelModal, {
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.applicationForm.resetToOriginal();
        this.backendErrors = {};
        this.applicationForm.backendErrors = this.backendErrors;
        this.mode.set('show');
      }
    });
  }

  onCancel() {
    console.log('Cancel clicked');
  }

  onModeChange(mode: 'show' | 'edit' | 'create') {
    this.mode.set(mode);
  }
}
