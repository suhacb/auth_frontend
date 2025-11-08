import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-application-update-confirm-modal',
  standalone: false,
  templateUrl: './application-update-confirm-modal.html',
  styleUrl: './application-update-confirm-modal.scss'
})
export class ApplicationUpdateConfirmModal {
  constructor (private dialogRef: MatDialogRef<ApplicationUpdateConfirmModal>) {}
  onRejectApplicationUpdate(): void {
    this.dialogRef.close(false);
  }

  onConfirmApplicationUpdate(): void {
    this.dialogRef.close(true);
  }
}
