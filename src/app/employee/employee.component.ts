import {
  Component,
  Input,
  numberAttribute,
  SimpleChanges,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../common/types/employee';
import { Router } from '@angular/router';
import { CreateEmployeeModalComponent } from '../dashboard/create-employee-modal/create-employee-modal.component';
import { SidebarComponent } from '../dashboard/sidebar/sidebar.component';
import { NgClass, UpperCasePipe } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    CreateEmployeeModalComponent,
    SidebarComponent,
    UpperCasePipe,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './employee.component.html',
})
export class EmployeeComponent {
  @Input({ transform: numberAttribute }) id: number = 0;
  employee: Employee | null = null;
  isEditable = false;

  formGroup = new FormGroup({
    firstName: new FormControl('', { validators: [Validators.required] }),
    lastName: new FormControl('', { validators: [Validators.required] }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    phone: new FormControl('', { validators: [Validators.required] }),
    city: new FormControl('', { validators: [Validators.required] }),
    postalCode: new FormControl('', { validators: [Validators.required] }),
    streetName: new FormControl('', { validators: [Validators.required] }),
    streetNumber: new FormControl('', { validators: [Validators.required] }),
    position: new FormControl('', { validators: [Validators.required] }),
    salary: new FormControl('', {
      validators: [Validators.required, Validators.min(1)],
    }),
    startDate: new FormControl('', { validators: [Validators.required] }),
    isRemote: new FormControl(),
    notes: new FormControl(''),
  });

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.fetchEmployee();
    this.formGroup.disable();
  }

  fetchEmployee() {
    this.http.get<Employee>(`/employees/${this.id}`).subscribe({
      next: (employee) => {
        this.employee = employee;
        this.formSetEmployeeData();
      },
      error: () => this.router.navigate(['/dashboard']),
    });
  }

  submit() {
    this.http
      .put<Employee>(`/employees/${this.id}`, this.formGroup.value)
      .subscribe({
        next: (employee) => {
          this.employee = employee;
          this.formSetEmployeeData();
          this.toggleEditable();
          this.toastr.success('Employee updated successfully');
        },
      });
  }

  formSetEmployeeData() {
    if (!this.employee) return;
    const {
      id: _,
      mobile,
      startDate,
      salary,
      fullName: __,
      ...rest
    } = this.employee;
    const date = new Date(startDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    this.formGroup.setValue({
      ...rest,
      phone: mobile,
      startDate: `${year}-${month}-${day}`,
      salary: salary.toString(),
      notes: rest.notes || '',
    });
  }

  toggleEditable() {
    this.isEditable = !this.isEditable;
    if (this.isEditable) this.formGroup.enable();
    else this.formGroup.disable();
  }
}
