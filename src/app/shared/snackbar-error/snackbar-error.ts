import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar-error',
  standalone: false,
  templateUrl: './snackbar-error.html',
  styleUrl: './snackbar-error.scss'
})
export class SnackbarErrorComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { message: string }, private snackBarRef: MatSnackBarRef<SnackbarErrorComponent>) {}

  dismiss() {
    this.snackBarRef.dismiss();
  }
}
