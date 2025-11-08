// import { Component, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ApplicationStore } from '../store/applications.store';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApplicationDeleteModal } from './application-delete-modal/application-delete-modal';
import { ApplicationCreateModal } from '../components/application-create-modal/application-create-modal';
import { Application } from '../contracts/Application';
import { DialogService } from '../../../core/DialogService/DialogService';
import { ApplicationCreateCancelModal } from './application-create-cancel-modal/application-create-cancel-modal';
import { ConfirmCancelDialog } from '../../../core/ConfirmCancelDialog/confirm-cancel-dialog';

@Component({
  selector: 'app-index',
  standalone: false,
  templateUrl: './index.html',
  styleUrl: './index.scss',
})

export class Index {
  public backendErrors: Record<string, string[]> | null = null;
  constructor(public store: ApplicationStore, private router: Router, private dialog: MatDialog, private dialogService: DialogService) {}

  show(application: Application): void {
    this.router.navigate(['/applications', application.id]);
  }

  openApplicationDeleteModal(application: Application): void {
    const dialogRef = this.dialog.open(ConfirmCancelDialog, {
      width: '600px',
      disableClose: true,
      data: {
        title: 'Delete Application',
        content: `Do you really want to delete the application ${application.name}?`
      }
    });

    // Subscribe to events (save and cancel)
    const modalInstance = dialogRef.componentInstance;
    modalInstance.confirm.subscribe(() => {
      this.handleApplicationDelete(application, dialogRef);
    })

    modalInstance.cancel.subscribe(() => {
      dialogRef.close();
    });
  }

  handleApplicationDelete(application: Application, dialogRef: MatDialogRef<ConfirmCancelDialog>) {
    this.store.deleteApplication(application).subscribe({
      next: () => {
        this.store.getIndex().subscribe();
        dialogRef.close();
      }
    });
  }

  openApplicationCreateModal(): void {
    const dialogRef = this.dialog.open(ApplicationCreateModal, {
      width: '1024px',
      disableClose: true,
    });

    // Subscribe to events (save and cancel)
    const modalInstance = dialogRef.componentInstance;
    modalInstance.storeApplication.subscribe((newApplication: Application) => {
      this.handleApplicationStore(newApplication, dialogRef);
    });

    modalInstance.cancelCreateApplication.subscribe(() => {
      this.handleCancelApplicationCreate(dialogRef);
    });
  }

  handleApplicationStore(newApplication: Application, dialogRef: MatDialogRef<ApplicationCreateModal>): void {
    this.store.storeApplication(newApplication).subscribe({
      next: (() => {
        this.store.getIndex().subscribe();
        dialogRef.close();
      }),
      error: (error => {
        this.backendErrors = error.error.errors || {};

        // Pass errors to modal instance if open
        const modal = this.dialog.openDialogs.find(
          d => d.componentInstance instanceof ApplicationCreateModal
        );
        if (modal) {
          modal.componentInstance.backendErrors = this.backendErrors;
        }
      })
    });
  }

  handleCancelApplicationCreate(dialogRef: MatDialogRef<ApplicationCreateModal>) {
    const confirmDialogRef = this.dialog.open(ApplicationCreateCancelModal, {
      width: '600px',
      disableClose: true
    });

    confirmDialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        dialogRef.close();
      }
    });
  }
}
