import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Application } from '../../models/application';
import { ApplicationResource } from '../../contracts/ApplicationResource';
import { applyValidationErrors, resetValidationErrors } from '../../../../core/http/form-error-helper';
import { ValidationErrorsMap } from '../../../../core/http/api-error-handler.service';


@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.html',
  styleUrls: ['./application-form.scss'],
  standalone: false
})
export class ApplicationForm implements OnInit {
  @Input() mode: 'create' | 'edit' | 'show' = 'create';
  @Input() application!: ApplicationResource;

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (!this.application) {
      this.application = new Application().toRaw();
    }
    this.form = this.fb.group(this.application);
  }

  get value() {
    return this.form.value;
  }

  applyValidationErrors(errors: ValidationErrorsMap): void {
    applyValidationErrors(this.form, errors);
  }

  resetValidationErrors(): void {
    resetValidationErrors(this.form);
  }
}