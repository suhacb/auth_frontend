import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Application } from '../../contracts/Application';
import { BaseFormComponent } from '../../../../core/BaseFormComponent/BaseFormComponent';


@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.html',
  styleUrls: ['./application-form.scss'],
  standalone: false
})
export class ApplicationForm extends BaseFormComponent<Application> {
  constructor(private fb: FormBuilder) {
    super();
  }

  buildForm(data: Application): FormGroup {
    return this.fb.group({
      name: [data.name ?? '', Validators.required],
      realm: [data.realm ?? '', Validators.required],
      clientId: [data.clientId ?? '', Validators.required],
      clientSecret: [data.clientSecret ?? ''],
      grantType: [data.grantType ?? '', Validators.required],
      url: [data.url ?? '', Validators.required],
      callbackUrl: [data.callbackUrl ?? '', Validators.required],
      description: [data.description ?? '']
    });
  }

  patchForm(data: Application): void {
    this.form.patchValue(data);
  }

  getValue(): Application {
    return this.form.getRawValue() as Application;
  }
}