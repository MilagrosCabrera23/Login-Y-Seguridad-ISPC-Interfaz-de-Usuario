import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../app/core/services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  errorMessage: string | null = null;

  loginForm: FormGroup = this.fb.group({
    username: [
      '',
      [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(40)],
    ],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(128)]],
    rememberMe: [false],
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.errorMessage = null;
      const { username, password, rememberMe } = this.loginForm.value;

      this.authService.login(username, password,rememberMe).subscribe({
        next: (response) => {
          console.log('Login exitoso:', response);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Login fallido:', error);
          this.errorMessage = 'Credenciales inválidas. Por favor, inténtalo de nuevo.';
        },
      });
    }
  }
}
