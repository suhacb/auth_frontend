import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-application-update-cancel-modal',
  standalone: false,
  templateUrl: './application-update-cancel-modal.html',
  styleUrl: './application-update-cancel-modal.scss'
})
export class ApplicationUpdateCancelModal {
  constructor(private dialogRef: MatDialogRef<ApplicationUpdateCancelModal>) {}

  onRejectApplicationUpdateCancel(): void {
    this.dialogRef.close(false);
  }
  onConfirmApplicationUpdateCancel(): void {
    this.dialogRef.close(true);
  }
}
