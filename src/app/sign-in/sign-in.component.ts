import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  errors: { email?: string; password?: string; signIn?: string } = {};

  constructor(private readonly authService: AuthService) {}

  handleSubmit() {
    this.errors = {};
    const { email, password } = this.loginForm.value;
    if (!email) this.errors = { ...this.errors, email: 'Email is required' };
    if (!password)
      this.errors = { ...this.errors, password: 'Password is required' };
    if (Object.keys(this.errors).length) return;
    this.authService.signIn(email!, password!).subscribe({
      error: ({ error }) => {
        this.errors.signIn = error.message;
      },
    });
  }
}
