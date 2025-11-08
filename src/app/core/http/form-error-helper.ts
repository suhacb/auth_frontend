import { FormGroup } from "@angular/forms";
import { ValidationErrorsMap } from "./api-handler-service";

export function applyValidationErrors(form: FormGroup, errors: ValidationErrorsMap): void {
    Object.entries(errors).forEach(([field, message]) => {
        const formKey = toCamelCase(field);
        const control = form.get(formKey);
        if (control) {
            control.setErrors({ server: Array.isArray(message) ? message.join(', ') : message });
        }
    });
}

export function resetValidationErrors(form: FormGroup): void {
    Object.entries(form.controls).forEach(([field, control]) => {
        control.setErrors(null);
    });
}

function toCamelCase(key: string): string {
  return key.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
}