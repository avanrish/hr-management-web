import { Component } from '@angular/core';
import { NgClass, UpperCasePipe } from '@angular/common';

import { SidebarComponent } from './sidebar/sidebar.component';
import { AuthService } from '../auth/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Routes } from '../routes';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, UpperCasePipe, NgClass, RouterOutlet, RouterLink],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  isSidebarOpen = false;
  isDropdownOpen = false;
  displayName = '';

  currentRoute = this.router.url.split('/')[1];

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  async ngOnInit() {
    const { firstName, lastName } = await this.authService.getMe();
    this.displayName = `${firstName} ${lastName}`;
    this.router.events.subscribe(() => {
      const splitUrl = this.router.url.split('/');
      this.currentRoute = splitUrl[splitUrl.length - 1];
    });
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
