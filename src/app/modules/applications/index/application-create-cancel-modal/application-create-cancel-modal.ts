import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-application-create-cancel-modal',
  standalone: false,
  templateUrl: './application-create-cancel-modal.html',
  styleUrl: './application-create-cancel-modal.scss'
})
export class ApplicationCreateCancelModal {
  constructor(private dialogRef: MatDialogRef<ApplicationCreateCancelModal>) {}
  
  onConfirmApplicationCreateCancel(): void {
    this.dialogRef.close(true);
  }

  onRejectApplicationCreateCancel(): void {
    this.dialogRef.close(false);
  }
}
