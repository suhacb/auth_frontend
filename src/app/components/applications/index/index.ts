// import { Component, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ApplicationStore } from '../store/applications.store';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApplicationDeleteModal } from './application-delete-modal/application-delete-modal';
import { ApplicationCreateModal } from '../components/application-create-modal/application-create-modal';
import { Application } from '../contracts/Application';
import { DialogService } from '../../../core/DialogService/DialogService';
import { ApplicationMapper } from '../models/ApplicationMapper';
import { ApplicationCreateCancelModal } from './application-create-cancel-modal/application-create-cancel-modal';

@Component({
  selector: 'app-index',
  standalone: false,
  templateUrl: './index.html',
  styleUrl: './index.scss',
})

export class Index {
  public backendErrors: Record<string, string[]> | null = null;
  constructor(public store: ApplicationStore, private router: Router, private dialog: MatDialog, private dialogService: DialogService) {}

  async show(id: number): Promise<void> {
    this.router.navigate(['/applications', id]);
  }

  confirmDelete(application: Application): void {
    this.dialogService.openFormDialog({
      component: ApplicationDeleteModal,
      data: {application},
      submit: (application: Application) => this.store.deleteApplication(application, {observe: 'response'}),
      reload: () => this.store.getIndex(),
      successMessage: 'Application deleted'
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
      this.handleStoreApplication(newApplication, dialogRef);
    });

    modalInstance.cancelCreateApplication.subscribe((newApplication: Application) => {
      this.handleCancelCreateApplication(dialogRef);
    });
  }

  handleStoreApplication(newApplication: Application, dialogRef: MatDialogRef<ApplicationCreateModal>): void {
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
        console.log(error);
      })
    });
  }

  handleCancelCreateApplication(dialogRef: MatDialogRef<ApplicationCreateModal>) {
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

  // openApplicationCreateModal() {
  //   console.log('openApplicationCreateModal');
  //   const dialogRef = this.dialog.open(ApplicationCreateModal, {
  //     width: '800px',
  //     disableClose: true, // user cannot close by clicking outside
  //     data: {
  //       backendErrors: this.backendErrors()
  //     }
  //   });
// 
  //   const createApplicationModal = dialogRef.componentInstance;
  //   createApplicationModal.storeApplication.subscribe((newApplication: Application) => {
  //     this.store.storeApplication(newApplication).pipe(
  //       switchMap(() => this.store.getIndex())
  //     ).subscribe({
  //       next: () => {
  //         dialogRef.close();
  //       },
  //       error: (error) => {
  //         if (error.status === 422 && error.error?.errors) {
  //           this.backendErrors.set(FormErrorMapper.toCamelCase(error.error.errors)); // set field-level errors
  //         } else {
  //           console.error(error);
  //         }
  //       }
  //     });
  //   })
  // }
  //      dialogRef.afterClosed().subscribe(async (result: Application) => {
  //         if (result) {
  //           // User confirmed create application — do the store in parent
  //           await this.store.storeApplication(result).then(() => {
  //             this.store.getIndex(); // reload applications index
  //           }).catch(error => {
  //             
  //           });
  //         }
  //      });

  testApi(){
    let application = new ApplicationMapper().make();
    application.id = 1;
    const response = this.store.testApi(application);
  }
}
