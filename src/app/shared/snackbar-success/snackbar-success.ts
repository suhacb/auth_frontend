import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar-success',
  standalone: false,
  templateUrl: './snackbar-success.html',
  styleUrl: './snackbar-success.scss'
})
export class SnackbarSuccessComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { message: string }, private snackBarRef: MatSnackBarRef<SnackbarSuccessComponent>) {}

  dismiss() {
    this.snackBarRef.dismiss();
  }
}
