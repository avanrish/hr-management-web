import { Component } from '@angular/core';
import { NgClass, UpperCasePipe } from '@angular/common';

import { SidebarComponent } from './sidebar/sidebar.component';
import { AuthService } from '../auth/auth.service';
import { CreateEmployeeModalComponent } from './create-employee-modal/create-employee-modal.component';
import { Employee } from '../common/types/employee';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SidebarComponent,
    UpperCasePipe,
    NgClass,
    CreateEmployeeModalComponent,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  isSidebarOpen = false;
  isDropdownOpen = false;
  isModalOpen = false;
  displayName = '';
  employees: Employee[] = [];

  setSidebar(state: boolean) {
    this.isSidebarOpen = state;
  }

  setModal(state: boolean) {
    this.isModalOpen = state;
  }

  addEmployee(employee: Employee) {
    this.employees.push(employee);
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
