import { Component, Signal, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationStore } from '../store/applications.store';
import { ApplicationForm } from '../components/application-form/application-form';
import { Application } from '../contracts/Application';
import { ApplicationMapper } from '../models/ApplicationMapper';
import { FormErrorMapper } from '../../../core/ErrorMapper/ErrorMapper';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApplicationUpdateConfirmModal } from './application-update-confirm-modal/application-update-confirm-modal';
import { ApplicationUpdateCancelModal } from './application-update-cancel-modal/application-update-cancel-modal';

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

  handleUpdateApplication(updatedApplication: Application): void {
    this.backendErrors = {};
    this.applicationForm.backendErrors = this.backendErrors;
    // Show confirm update dialog
    const dialogRef = this.dialog.open(ApplicationUpdateConfirmModal, {
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result) {
        const updatedApplication = this.applicationForm.getValue();
        this.store.updateApplication(this.application(), updatedApplication).subscribe({
          next: () => {
            this.mode.set('show');
            this.application.set(this.store.show());
          },
          error: (error) => {
            this.backendErrors = error.error.errors || {};
            this.applicationForm.backendErrors = this.backendErrors;
          }
        });
      }
    });
  }

  handleEditApplicationCancel(): void {
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

  onUpdate(updatedApplication: Application) {
//     this.backendErrors.set(null); // clear old errors
//     this.store.updateApplication(this.application.id, updatedApplication).subscribe({
//       next: (response) => {
//         this.application = response;
//         this.mode.set('show');
//       },
//       error: (error) => {
//         if (error.status === 422 && error.error?.errors) {
//           this.backendErrors.set(FormErrorMapper.toCamelCase(error.error.errors)); // set field-level errors
//         } else {
//           console.error(error);
//         }
//       }
//     })
  }

  onCancel() {
    console.log('Cancel clicked');
  }

  onModeChange(mode: 'show' | 'edit' | 'create') {
    this.mode.set(mode);
  }

  // editApplication(): void {
  //   this.mode.set('edit');
  // }
// 
  // async cancelEdit(): Promise<void> {
  //   if (this.application?.id) {
  //     await this.store.getApplication(this.application.id).then(() => {
  //       this.mode.set('show');
  //       this.application = this.store.show() ?? null;
  //       this.applicationForm.resetValidationErrors();
  //     });
  //   }
  // }
// 
  // async updateApplication(): Promise<void> {
  //   // const data = new Application({rawData: this.applicationForm.value});
  //   // const result =  await this.store.updateApplication(data.toApi());
// 
  //   const application = new ApplicationMapper().toApp(this.applicationForm.value);
  //   const applicationApiResource = new ApplicationMapper().toApi(application);
  //   if(this.application) {
  //     const result = await this.store.updateApplication(this.application.id, applicationApiResource);
// 
  //     if (result === true) {
  //       this.application = this.store.show();
  //       this.mode.set('show');
  //       this.router.navigate(['/applications', this.application?.id]);
  //     }
  //     if (result && typeof result === 'object' && result.validationErrors) {
  //         this.applicationForm.applyValidationErrors(result.validationErrors);
  //     }
// 
  //   }
  //   
// 
  // }
}
