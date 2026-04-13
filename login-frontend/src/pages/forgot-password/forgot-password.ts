import { Component,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormGroup,Validators,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../app/core/services/auth';


@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
  private authService = inject(AuthService);
  private router = inject(Router)
  private fb = inject(FormBuilder);

  message: string | null = null;
  errorMessage: string | null = null;
  isloading: boolean = false;

  requestForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  onSubmit():void {
    if(this.requestForm.invalid) {
      return;
    }

    this.isloading = true;
    this.errorMessage = null;
    this.message = null;

    const email = this.requestForm.value.email;

    this.authService.requestOtp(email).subscribe({
      next: (response) => {
        this.isloading = false;
        this.message = 'Si tu correo existe en nuestro sistema, recibirás un código para restablecer tu contraseña.';
        this.router.navigate(['/reset-password'],{ queryParams: { email: email } });
      },
      error:(err) => {
        this.isloading = false;
        this.errorMessage = err.error.message || 'Ocurrió un error. Inténtalo de nuevo.';
        console.error('Error al solicitar:', err);
      }
    });
  }
}
