import { Component, OnInit } from '@angular/core';
import { ApplicationStore } from '../store/applications.store';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ApplicationDeleteModal } from './application-delete-modal/application-delete-modal';
import { Application } from '../models/application';
import { ApplicationCreateModal } from '../components/application-create-modal/application-create-modal';

@Component({
  selector: 'app-index',
  standalone: false,
  templateUrl: './index.html',
  styleUrl: './index.scss',
})

export class Index implements OnInit {
  constructor(public store: ApplicationStore, private router: Router, private dialog: MatDialog) {}
  
  async ngOnInit(): Promise<void> {
    this.store.setIndex([]);
    await this.store.getIndex();
  }

  async show(id: number): Promise<void> {
    const response = await this.store.getApplication(id);
    if (response) {
      this.router.navigate(['/applications', id]);
    }
  }

  confirmDelete(application: Application) {
    const dialogRef = this.dialog.open(ApplicationDeleteModal, {
      width: '600px',
      disableClose: true, // user cannot close by clicking outside
      data: {application: application}
    });

    dialogRef.afterClosed().subscribe(async (result: Application | false) => {
       if (result && result.id) {
         // User confirmed deletion — do the deletion in parent
         await this.store.deleteApplication(result.id).then(() => {
           this.store.getIndex(); // reload applications index
         }).catch(error => {
           
         });
       }
    });
  }

  openApplicationCreateModal() {
    const dialogRef = this.dialog.open(ApplicationCreateModal, {
      width: '800px',
      disableClose: true // user cannot close by clicking outside
    });

    dialogRef.afterClosed().subscribe(async (result: Application) => {
       if (result) {
         // User confirmed create application — do the store in parent
         await this.store.storeApplication(result).then(() => {
           this.store.getIndex(); // reload applications index
         }).catch(error => {
           
         });
       }
    });
  }

  create() {
    console.log('create');
  }
}
