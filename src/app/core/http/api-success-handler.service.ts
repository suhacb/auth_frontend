import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarSuccessComponent } from "../../shared/snackbar-success/snackbar-success";

export interface ValidationErrorsMap {
    [field: string]: string | string[];
}

export interface ApiSuccessResult {
    ok: true;
    status: number;
}

@Injectable({ providedIn: 'root' })

export class ApiSuccessHandlerService {
    constructor(private snackbar: MatSnackBar) {}

    handle(success: HttpResponse<any>, message?: string): true {
        const finalMessage = message ?? (success.body ? String(success.body) : 'Success!');
        this.showSuccess(finalMessage);
        return true;
    }

    private showSuccess(message: string) {
        this.snackbar.openFromComponent(SnackbarSuccessComponent, {
            data: { message },
            duration: 8000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['snackbar-success'],
        });
    }
}
