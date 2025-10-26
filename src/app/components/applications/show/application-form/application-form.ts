import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Application } from '../../models/application';


@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.html',
  styleUrls: ['./application-form.scss'],
  standalone: false
})
export class ApplicationForm implements OnInit {
  @Input() application: Application | null = null;
  @Output() save = new EventEmitter<Application>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;
  isEdit = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {    
    this.isEdit = !!this.application;
    this.form = this.fb.group({
      name: [this.application?.name ?? ''],
      realm: [this.application?.realm ?? ''],
      clientId: [this.application?.clientId ?? ''],
      grantType: [this.application?.grantType ?? 'password'],
      url: [this.application?.url ?? ''],
      callbackUrl: [this.application?.callbackUrl ?? ''],
      description: [this.application?.description ?? ''],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
