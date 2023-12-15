import { Component } from '@angular/core';
import { NgClass, UpperCasePipe } from '@angular/common';

import { SidebarComponent } from './sidebar/sidebar.component';
import { AuthService } from '../auth/auth.service';
import { CreateEmployeeModalComponent } from './create-employee-modal/create-employee-modal.component';
import { Employee } from '../common/types/employee';
import { HttpClient } from '@angular/common/http';

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

  constructor(
    private readonly authService: AuthService,
    private readonly http: HttpClient,
  ) {}

  async ngOnInit() {
    const { firstName, lastName } = await this.authService.getMe();
    this.displayName = `${firstName} ${lastName}`;
    this.fetchEmployees();
  }

  setSidebar(state: boolean) {
    this.isSidebarOpen = state;
  }

  setModal(state: boolean) {
    this.isModalOpen = state;
  }

  addEmployee(employee: Employee) {
    this.employees.push(employee);
  }

  signOut() {
    this.authService.signOut();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  fetchEmployees() {
    this.http.get<Employee[]>('/employees').subscribe({
      next: (employees) => {
        this.employees = employees;
      },
    });
  }
}
