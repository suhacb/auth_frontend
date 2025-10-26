import { Component, signal, ViewChild } from '@angular/core';
import { AuthStore } from '../store/auth.store';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogoutModal } from '../modals/logout-modal/logout-modal';
import { MainMenu } from './main-menu/main-menu';

@Component({
  selector: 'app-auth-layout',
  standalone: false,
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss',
})
export class AuthLayout {
  public showLogoutModal = false;

  constructor(
    public store: AuthStore,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  @ViewChild(MainMenu) menu!: MainMenu;

  openLogoutModal() {
    this.dialog.open(LogoutModal, {
      width: '400px',
      disableClose: true // user cannot close by clicking outside
    });
  }

  closeLogoutModal() { this.showLogoutModal = false; }

  openMainMenuSidebar() {}
  closeMainMenuSidebar() {}
  toggleMainMenuSidebar() {
    this.menu.toggle();
  }

  async logout() {
    try {
      const result = await this.store.logout();

      if (result === true) {
        // Successful logout
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.showLogoutModal = false;
    }
  }
}
