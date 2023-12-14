import { Component } from '@angular/core';
import { NgClass, UpperCasePipe } from '@angular/common';

import { SidebarComponent } from './sidebar/sidebar.component';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, UpperCasePipe, NgClass],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  isSidebarOpen = false;
  isDropdownOpen = false;
  displayName = '';

  setSidebar(state: boolean) {
    this.isSidebarOpen = state;
  }

  constructor(private readonly authService: AuthService) {}

  async ngOnInit() {
    const { firstName, lastName } = await this.authService.getMe();
    this.displayName = `${firstName} ${lastName}`;
  }

  signOut() {
    this.authService.signOut();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
