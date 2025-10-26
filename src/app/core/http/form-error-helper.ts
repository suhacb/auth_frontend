import { FormGroup } from "@angular/forms";
import { ValidationErrorsMap } from "./api-error-handler.service";

export function applyValidationErrors(form: FormGroup, errors: ValidationErrorsMap): void {
    Object.entries(errors).forEach(([field, message]) => {
        const control = form.get(field);
        if (control) {
            control.setErrors({ server: Array.isArray(message) ? message.join(', ') : message });
        }
    });
}