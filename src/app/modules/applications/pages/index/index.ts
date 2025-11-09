// import { Component, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ApplicationStore } from '../../store/applications.store';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApplicationCreateModal } from '../../components/application-create-modal/application-create-modal';
import { Application } from '../../contracts/Application';
import { ConfirmCancelDialog } from '../../../../core/ConfirmCancelDialog/confirm-cancel-dialog';

@Component({
  selector: 'app-index',
  standalone: false,
  templateUrl: './index.html',
  styleUrl: './index.scss',
})
export class ApplicationsIndex {
  /** Backend validation errors from the API */
  public backendErrors: Record<string, string[]> | null = null;

  constructor(
    public store: ApplicationStore, 
    private router: Router, 
    private dialog: MatDialog
  ) {}

  /**
   * Navigate to the detail page of the given application.
   * @param application The application to view.
   */
  show(application: Application): void {
    this.router.navigate(['/applications', application.id]);
  }

  /**
   * Opens the modal dialog for creating a new application.
   * Subscribes to the create and cancel events emitted by the dialog.
   */
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

  /**
   * Handles storing a new application after the user confirms creation.
   * Opens a confirmation dialog, stores the application via the store, 
   * refreshes the index, and handles backend validation errors if any.
   * @param newApplication The application object to store.
   * @param dialogRef Reference to the create application modal.
   */
  handleApplicationStore(
    newApplication: Application, 
    dialogRef: MatDialogRef<ApplicationCreateModal>
  ): void {
    const confirmCancelDialogRef = this.dialog.open(ConfirmCancelDialog, {
      width: '600px',
      disableClose: true,
      data: {
        title: 'Create Application',
        content: 'Do you want to create new application?'
      }
    });

    const modalInstance = confirmCancelDialogRef.componentInstance;
    modalInstance.confirm.subscribe(() => {
      this.store.storeApplication(newApplication).subscribe({
        next: (() => {
          this.store.getApplications().subscribe();
          confirmCancelDialogRef.close();
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
          confirmCancelDialogRef.close();
        })
      });
    });

    modalInstance.cancel.subscribe(() => {
      confirmCancelDialogRef.close();
    });
  }

  /**
   * Handles the cancellation of creating a new application.
   * Opens a confirmation dialog asking the user if they want to discard changes.
   * @param dialogRef Reference to the create application modal.
   */
  handleCancelApplicationCreate(dialogRef: MatDialogRef<ApplicationCreateModal>) {
    const confirmCancelDialogRef = this.dialog.open(ConfirmCancelDialog, {
      width: '600px',
      disableClose: true,
      data: {
        title: 'Cancel Create Application',
        content: 'Do you want to cancel creating an application? The data you entered will be lost.'
      }
    });

    // Subscribe to events (confirm and cancel)
    const modalInstance = confirmCancelDialogRef.componentInstance;
    modalInstance.confirm.subscribe(() => {
      confirmCancelDialogRef.close();
      dialogRef.close();
    });
    
    modalInstance.cancel.subscribe(() => {
      confirmCancelDialogRef.close();
    });
  }

  /**
   * Opens a confirmation dialog to delete the specified application.
   * @param application The application to delete.
   */
  openApplicationDeleteModal(application: Application): void {
    const dialogRef = this.dialog.open(ConfirmCancelDialog, {
      width: '600px',
      disableClose: true,
      data: {
        title: 'Delete Application',
        content: `Do you really want to delete the application ${application.name}?`
      }
    });

    // Subscribe to events (confirm and cancel)
    const modalInstance = dialogRef.componentInstance;
    modalInstance.confirm.subscribe(() => {
      this.handleApplicationDelete(application, dialogRef);
    })

    modalInstance.cancel.subscribe(() => {
      dialogRef.close();
    });
  }

  /**
   * Deletes the specified application using the store and refreshes the index.
   * Closes the confirmation dialog after deletion.
   * @param application The application to delete.
   * @param dialogRef Reference to the delete confirmation dialog.
   */
  handleApplicationDelete(application: Application, dialogRef: MatDialogRef<ConfirmCancelDialog>) {
    this.store.deleteApplication(application).subscribe({
      next: () => {
        this.store.getApplications().subscribe();
        dialogRef.close();
      }
    });
  }
}

