import { Component, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationStore } from '../store/applications.store';
import { Application } from '../models/application';
import { ApplicationResource } from '../contracts/ApplicationResource';
import { ApplicationForm } from '../components/application-form/application-form';

@Component({
  selector: 'app-show',
  standalone: false,
  templateUrl: './show.html',
  styleUrl: './show.scss'
})
export class Show {
  public application: ApplicationResource;
  public mode = signal<'show' | 'edit' | 'create'>('show');

  @ViewChild('applicationForm') applicationForm!: ApplicationForm;

  constructor(public store: ApplicationStore, private router: Router) {
    this.application = this.store.show();
  }

  editApplication(): void {
    this.mode.set('edit');
  }

  cancelEdit(): void {
    this.mode.set('show');
    this.application = this.store.show();
    this.applicationForm.resetValidationErrors();
    this.router.navigate(['/applications', this.application.id]);
  }

  async updateApplication(): Promise<void> {
    const data = new Application({rawData: this.applicationForm.value});
    const result =  await this.store.updateApplication(data.toApi());
    
    if (result === true) {
      this.application = this.store.show();
      this.mode.set('show');
      this.router.navigate(['/applications', this.application.id]);
    }

    if (result && typeof result === 'object' && result.validationErrors) {
      this.applicationForm.applyValidationErrors(result.validationErrors);
    }
  }
}
