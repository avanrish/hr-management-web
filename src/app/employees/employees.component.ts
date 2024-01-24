import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CreateEmployeeModalComponent } from '../employee/create-employee-modal/create-employee-modal.component';
import { Employee } from '../common/types/employee';
import { HttpClient } from '@angular/common/http';
import { Routes } from '../routes';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CreateEmployeeModalComponent, RouterLink],
  templateUrl: './employees.component.html',
})
export class EmployeesComponent implements OnInit {
  isModalOpen = false;
  employees: Employee[] = [];

  constructor(private readonly http: HttpClient) {}

  ngOnInit() {
    this.fetchEmployees();
  }

  setModal(state: boolean) {
    this.isModalOpen = state;
  }

  addEmployee(employee: Employee) {
    this.employees.push(employee);
  }

  fetchEmployees() {
    this.http.get<Employee[]>('/employees').subscribe({
      next: (employees) => {
        this.employees = employees;
      },
    });
  }

  protected readonly Routes = Routes;
}
