import { Component, inject, signal, ViewChild } from '@angular/core';
import { AuthStore } from '../login/store/auth.store';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { APP_CONFIG } from '../../config/app-config';
import { ConfirmCancelDialog } from '../../core/ConfirmCancelDialog/confirm-cancel-dialog';

@Component({
  selector: 'app-auth-layout',
  standalone: false,
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss',
})
export class AuthLayout {
  constructor(
    public store: AuthStore,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  public cfg = inject(APP_CONFIG);

  openLogoutModal() {
    const dialogRef = this.dialog.open(ConfirmCancelDialog, {
      width: '600px',
      disableClose: true,
      data: {
        title: 'Logout',
        content: 'Dou you want to logout?'
      }
    });

    const modalInstance = dialogRef.componentInstance;
    modalInstance.confirm.subscribe(() => {
      this.logout(dialogRef);
    });
    modalInstance.cancel.subscribe(() => {
      dialogRef.close();
    });
  }
  
  @ViewChild('sidenav') sidenav!: MatSidenav;

  toggleMainMenuSidebar() {
    this.sidenav.toggle();
  }

  logout(dialogRef: MatDialogRef<ConfirmCancelDialog>) {
    this.store.logout().subscribe({
      next: () => {
        dialogRef.close();
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  };
}
