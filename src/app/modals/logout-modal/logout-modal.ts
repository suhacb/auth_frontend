import { Component, EventEmitter, Output } from '@angular/core';
import { AuthStore } from '../../store/auth.store';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-logout-modal',
  standalone: false,
  templateUrl: './logout-modal.html',
  styleUrl: './logout-modal.scss'
})
export class LogoutModal {
  public isVisible: boolean = false;

  @Output() closed = new EventEmitter<void>();

  constructor(private store: AuthStore, private router: Router, private dialogRef: MatDialogRef<LogoutModal>) {}

  close() {
    this.dialogRef.close();
    
  }

  async confirmLogout() {
    try {
      const result = await this.store.logout();
      if (result === true) {
        this.router.navigate(['/login']);
      } else {
        console.warn('Logout failed', result);
      }
    } catch (err) {
      console.error('Unexpected logout error:', err);
    } finally {
      this.dialogRef.close();
    }
  }



}
