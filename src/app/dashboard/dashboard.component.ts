import { Component, OnInit } from '@angular/core';
import { NgClass, UpperCasePipe } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { SidebarComponent } from './sidebar/sidebar.component';
import { AuthService } from '../auth/auth.service';
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
export class DashboardComponent implements OnInit {
  isSidebarOpen = false;
  isDropdownOpen = false;
  displayName = '';

  constructor(private readonly authService: AuthService) {}

  async ngOnInit() {
    const user = await this.authService.getMe();
    if (!user) return;
    this.displayName = `${user.firstName} ${user.lastName}`;
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
