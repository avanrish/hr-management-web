import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  constructor(private readonly authService: AuthService) {}

  handleSubmit() {
    const { email, password } = this.loginForm.value;
    if (!email || !password) return alert('Please fill in all fields');
    this.authService.signIn(email, password);
  }
}
