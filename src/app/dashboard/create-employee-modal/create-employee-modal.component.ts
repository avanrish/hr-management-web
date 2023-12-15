import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Employee } from '../../common/types/employee';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-employee-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-employee-modal.component.html',
})
export class CreateEmployeeModalComponent {
  @Input({ required: true }) isOpen = false;
  @Output() isOpenEvent = new EventEmitter<boolean>();
  @Output() createEmployeeEvent = new EventEmitter<Employee>();

  formGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [Validators.required]),
    streetName: new FormControl('', [Validators.required]),
    streetNumber: new FormControl('', [Validators.required]),
    position: new FormControl('', [Validators.required]),
    salary: new FormControl('', [Validators.required, Validators.min(1)]),
    startDate: new FormControl('', [Validators.required]),
    isRemote: new FormControl(),
    notes: new FormControl(''),
  });

  constructor(private readonly http: HttpClient) {}

  closeModal() {
    this.formGroup.reset();
    this.isOpenEvent.emit(false);
  }

  submit() {
    this.http.post('/employees', this.formGroup.value).subscribe({
      next: (employee) => {
        this.createEmployeeEvent.emit(employee as Employee);
        this.closeModal();
      },
    });
  }
}
