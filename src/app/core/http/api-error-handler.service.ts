import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarErrorComponent } from "../../shared/snackbar-error/snackbar-error";

export interface ValidationErrorsMap {
    [field: string]: string | string[];
}

export interface ApiErrorResult {
    ok: false;
    status: number;
    validationErrors?: ValidationErrorsMap
}

@Injectable({ providedIn: 'root' })

export class ApiErrorHandlerService {
    constructor(private snackbar: MatSnackBar) {}

    handle(error: HttpErrorResponse): ApiErrorResult | false{
        console.log(error);

        if (error.status >= 500) {
            this.showError(`Server error ${error.status}. Please try again later.`);
            return false;
        }

        if (error.status === 422) {
            // Return structured validation errors
            return {
                ok: false,
                status: error.status,
                validationErrors: error.error.errors ?? {},
            };
        }

        if (error.status === 403) {
            this.showError(`Error ${error.status}: Forbidden.`);
            return false;
        }

        if (error.status === 401) {
            this.showError(`Error ${error.status}: Unauthorized.`);
            return {
                ok: false,
                status: error.status,
                validationErrors: error.error.errors ?? {},
            };
        }

        if (error.status === 404) {
            this.showError(`Error ${error.status}: Resource not found.`);
            return {
                ok: false,
                status: error.status,
            };
        }

        if (error.status >= 400 && error.status < 500) {
            this.showError(error.error?.message || `Request failed (${error.status})`);
            return false;
        }

        // Unexpected case
        this.showError('Unexpected error occurred.');
        return false;
    }

    private showError(message: string) {
        this.snackbar.openFromComponent(SnackbarErrorComponent, {
            data: { message },
            duration: 8000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['snackbar-error'],
        });
    }
}
