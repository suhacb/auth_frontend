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
  /**
   * Reactive signal tracking the current mode of the form.
   * Possible values:
   *  - `'show'`: view-only mode (read-only form)
   *  - `'edit'`: editable mode
   *  - `'create'`: creating a new application
   */
  public mode = signal<'show' | 'edit' | 'create'>('show');

  /**
   * Reactive signal holding the current application instance being viewed or edited.
   */
  public application = signal<Application>(new ApplicationMapper().make());

  /**
   * Holds backend validation errors returned from the API, if any.
   * Keys correspond to form field names; values are arrays of error messages.
   */
  public backendErrors: Record<string, string[]> | null = null;

  /**
   * Reference to the child ApplicationForm component instance.
   * Allows interaction with form methods (e.g., getValue(), resetToOriginal()).
   */
  @ViewChild('applicationForm') applicationForm!: ApplicationForm;

  /**
   * Initializes the component by setting the application signal
   * with the currently loaded application from the store.
   * 
   * @param store The application store service used for fetching and updating application data.
   * @param router Angular router used for navigation.
   * @param dialog Angular Material dialog service used for confirmation dialogs.
   */
  constructor(
    public store: ApplicationStore,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.application.set(this.store.show());
  }

  /**
   * Handles updating an existing application.
   * Opens a confirmation dialog asking the user to confirm the update.
   * On confirmation, it clears previous backend errors, retrieves the latest
   * form data, and triggers the store update.
   *
   * - On success: switches the form back to 'show' mode, reloads the application data, and closes the dialog.
   * - On error: updates and displays backend validation errors.
   * 
   * @param updatedApplication The updated application data emitted by the form.
   */
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

  /**
   * Handles the cancellation of application editing.
   * Opens a confirmation dialog to confirm whether the user really wants to discard unsaved changes.
   * 
   * - On confirmation: resets the form to its original state,
   *   clears backend errors, switches the form back to 'show' mode, and closes the dialog.
   * - On cancellation: simply closes the confirmation dialog.
   */
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
