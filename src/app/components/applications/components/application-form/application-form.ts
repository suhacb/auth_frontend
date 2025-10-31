import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { applyValidationErrors, resetValidationErrors } from '../../../../core/http/form-error-helper';
import { ValidationErrorsMap } from '../../../../core/http/api-error-handler.service';
import { Application } from '../../contracts/Application';
import { ApplicationMapper } from '../../models/ApplicationMapper';


@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.html',
  styleUrls: ['./application-form.scss'],
  standalone: false
})
export class ApplicationForm implements OnInit {
  @Input() mode: 'create' | 'edit' | 'show' = 'create';
  @Input() application!: Application;

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (!this.application) {
      this.application = new ApplicationMapper().make();
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