import { Component, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationStore } from '../store/applications.store';
import { ApplicationForm } from '../components/application-form/application-form';
import { Application } from '../contracts/Application';
import { ApplicationMapper } from '../models/ApplicationMapper';

@Component({
  selector: 'app-show',
  standalone: false,
  templateUrl: './show.html',
  styleUrl: './show.scss'
})
export class Show {
  public mode = signal<'show' | 'edit' | 'create'>('show');
  public application: Application;
  
  constructor(public store: ApplicationStore, private router: Router) {
    this.application = this.store.show();
  }
  

  @ViewChild('applicationForm') applicationForm!: ApplicationForm;

  onUpdate(updatedApplication: Application) {
    this.store.updateApplication(this.application.id, updatedApplication).subscribe({
      next: (response) => {
        this.application = response;
        this.mode.set('show');
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onCancel() {
    console.log('Cancel clicked');
  }

  onModeChange(mode: 'show' | 'edit' | 'create') {
    this.mode.set(mode);
  }

  // editApplication(): void {
  //   this.mode.set('edit');
  // }
// 
  // async cancelEdit(): Promise<void> {
  //   if (this.application?.id) {
  //     await this.store.getApplication(this.application.id).then(() => {
  //       this.mode.set('show');
  //       this.application = this.store.show() ?? null;
  //       this.applicationForm.resetValidationErrors();
  //     });
  //   }
  // }
// 
  // async updateApplication(): Promise<void> {
  //   // const data = new Application({rawData: this.applicationForm.value});
  //   // const result =  await this.store.updateApplication(data.toApi());
// 
  //   const application = new ApplicationMapper().toApp(this.applicationForm.value);
  //   const applicationApiResource = new ApplicationMapper().toApi(application);
  //   if(this.application) {
  //     const result = await this.store.updateApplication(this.application.id, applicationApiResource);
// 
  //     if (result === true) {
  //       this.application = this.store.show();
  //       this.mode.set('show');
  //       this.router.navigate(['/applications', this.application?.id]);
  //     }
  //     if (result && typeof result === 'object' && result.validationErrors) {
  //         this.applicationForm.applyValidationErrors(result.validationErrors);
  //     }
// 
  //   }
  //   
// 
  // }
}
