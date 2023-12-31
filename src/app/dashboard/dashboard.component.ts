import { Component } from '@angular/core';
import { NgClass, UpperCasePipe } from '@angular/common';

import { SidebarComponent } from './sidebar/sidebar.component';
import { AuthService } from '../auth/auth.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Routes } from '../routes';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SidebarComponent,
    UpperCasePipe,
    NgClass,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  isSidebarOpen = false;
  isDropdownOpen = false;
  displayName = '';

  constructor(private readonly authService: AuthService) {}

  async ngOnInit() {
    const { firstName, lastName } = await this.authService.getMe();
    this.displayName = `${firstName} ${lastName}`;
  }

  setSidebar(state: boolean) {
    this.isSidebarOpen = state;
  }

  signOut() {
    this.authService.signOut();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  protected readonly Routes = Routes;
}
