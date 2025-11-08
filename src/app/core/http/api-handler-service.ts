import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackBarComponent } from "../SnackBarComponent/snack-bar-component";

export interface ValidationErrorsMap {
    [field: string]: string | string[];
}

export interface apiResult {
    ok: boolean,
    status: number,
    validationErrors?: ValidationErrorsMap
}

@Injectable({providedIn: 'root'})
export class ApiHandlerService {
    constructor(private snackbar: MatSnackBar) {}

  /**
   * Show a success snackbar from an HTTP response or a custom message.
   * @param success Optional HttpResponse object
   * @param message Optional message string
   */
  showSuccess(message: string): void;
  showSuccess(success: HttpResponse<any>, message?: string): void;
  showSuccess(arg: HttpResponse<any> | string, message?: string): void {
    const finalMessage =
      typeof arg === 'string'
        ? arg
        : message ?? (arg.body ? String(arg.body) : 'Success!');
    this.openSnackbar(finalMessage, 'success');
  }

/**
   * Show an error snackbar from an HttpErrorResponse or a custom message.
   * Optionally returns structured validation errors for 422 or 401 responses.
   */
  showError(error: HttpErrorResponse | string): apiResult | false {
    if (typeof error === 'string') {
      this.openSnackbar(error, 'error');
      return false;
    }

    if (error.status >= 500) {
      this.openSnackbar(`Server error ${error.status}. Please try again later.`, 'error');
      return false;
    }

    if (error.status === 422) {
      this.openSnackbar(`Error ${error.status}: ${error.statusText}`, 'error');
      return {
        ok: false,
        status: error.status,
        validationErrors: error.error?.errors ?? {},
      };
    }

    if (error.status === 403) {
      this.openSnackbar(`Error ${error.status}: Forbidden.`, 'error');
      return false;
    }

    if (error.status === 401) {
      this.openSnackbar(`Error ${error.status}: Unauthorized.`, 'error');
      return {
        ok: false,
        status: error.status,
        validationErrors: error.error?.errors ?? {},
      };
    }

    if (error.status === 404) {
      this.openSnackbar(`Error ${error.status}: Resource not found.`, 'error');
      return {
        ok: false,
        status: error.status,
      };
    }

    if (error.status >= 400 && error.status < 500) {
      this.openSnackbar(error.error?.message || `Request failed (${error.status})`, 'error');
      return false;
    }

    this.openSnackbar('Unexpected error occurred.', 'error');
    return false;
  }

  /**
   * Generic method to open the snackbar with type (success/error)
   */
  private openSnackbar(message: string, type: 'success' | 'error') {
    this.snackbar.openFromComponent(SnackBarComponent, {
      data: { message, type },
      duration: 8000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
}