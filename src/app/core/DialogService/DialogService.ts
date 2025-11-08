import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { catchError, Observable, of, switchMap, tap, throwError } from "rxjs";
import { ApiSuccessHandlerService } from "../http/api-success-handler.service";
import { HttpResponse } from "@angular/common/http";

export interface FormDialogConfig<T> {
    component: any;
    data?: any;
    width?: string;
    submit: (formValue: T) => Observable<HttpResponse<any>>;
    reload?: () => Observable<any>;
    successMessage?: string;
}

@Injectable({providedIn: 'root'})
export class DialogService {
  constructor(private dialog: MatDialog, private snack: MatSnackBar, private apiSuccessHandler: ApiSuccessHandlerService) {}

openFormDialog<T>(config: FormDialogConfig<T>): void {
    const dialogRef: MatDialogRef<any> = this.dialog.open(config.component, {
      width: config.width ?? '700px',
      disableClose: true,
      data: config.data ?? {}
    });

    dialogRef.afterClosed().pipe(
      // result is either the form value (on submit) or false (on cancel)
      switchMap((result: T | false | null) => {
        if (!result) {
          // user cancelled or closed without submitting
          return of(null);
        }

        // call the submit handler provided by the page (store.create...),
        // then optionally call reload().
        return config.submit(result).pipe(
          tap((response: HttpResponse<any>) => {
            this.apiSuccessHandler.handle(response, config.successMessage);
          }),
          switchMap(() => config.reload ? config.reload() : of(null)),
          // Important: catchError must return an ObservableInput — we return it from handleError
          catchError((error) => this.handleError(error, dialogRef))
        );
      })
    ).subscribe({
      next: () => {
        // Ensure dialog is closed (it should already be closed because modal closes on submit),
        // but calling close() is harmless.
        try { dialogRef.close(); } catch (e) { /* ignore */ }
      },
      error: (err) => {
        // Errors are already handled inside handleError (snackbars / setErrors).
        // If you want additional global logging, do it here.
        console.error('DialogService error:', err);
      }
    });
  }

  private handleError(error: any, dialogRef: MatDialogRef<any>): Observable<never> {
    if (error?.status === 422) {
      // validation errors — pass them to modal instance if method exists
      const instance = dialogRef.componentInstance;
      const errors = extractValidationErrors(error); // helper below or inline
      if (instance && typeof instance.setErrors === 'function') {
        instance.setErrors(errors);
      }
      // keep modal open; rethrow to allow subscription error handler to run if needed
      return throwError(() => error);
    }

    // other errors -> show snackbar and keep modal open
    const message = this.getErrorMessage(error);
    this.snack.open(message, 'Close', { duration: 5000 });

    return throwError(() => error);
  }

  private getErrorMessage(error: any): string {
    if (!error || !error.status) return 'An unexpected error occurred';
    if (error.status === 401) return 'Unauthorized';
    if (error.status === 403) return 'Access denied';
    if (error.status >= 500) return 'Server error';
    return error.error?.message ?? 'An unexpected error occurred';
  }

}

function extractValidationErrors(errorResponse: any): Record<string, string[]> {
    // assume backend returns: { errors: { field_name: ['msg1', 'msg2'] } }
    if (!errorResponse?.error?.errors) return {};
    return errorResponse.error.errors;
}