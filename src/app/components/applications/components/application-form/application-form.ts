import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Application } from '../../models/application';
import { ApplicationResource } from '../../contracts/ApplicationResource';


@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.html',
  styleUrls: ['./application-form.scss'],
  standalone: false
})
export class ApplicationForm implements OnInit {
  @Input() mode: 'create' | 'edit' = 'create';
  @Input() application!: ApplicationResource;

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (!this.application) {
      this.application = new Application().toRaw();
    }
    console.log(this.application);
    this.form = this.fb.group(this.application);
  }

  get value() {
    return this.form.value;
  }
}
