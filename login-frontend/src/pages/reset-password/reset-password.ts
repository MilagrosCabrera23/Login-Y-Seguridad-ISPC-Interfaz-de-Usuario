import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../app/core/services/auth';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPassword implements OnInit {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    message: string | null = null;
    errorMessage: string | null = null;
    isLoading: boolean = false;

    resetForm: FormGroup = this.fb.group({
        email: [{value: '', disabled: true}, [Validators.required, Validators.email]],
        otp_code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
        newPassword: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(20)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    });

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            const email = params['email'];
            if(email) {
                this.resetForm.get('email')?.setValue(email);
            }
            else {
                console.warn('No se proporcionó el correo electrónico en los parámetros de la URL');
                this.router.navigate(['/forgot-password']);
            }
        });
    }

    onSubmit(): void {
        if (this.resetForm.invalid) {
            return;
        }

        this.isLoading = true;
        this.message = null;
        this.errorMessage = null;

        const email  = this.resetForm.getRawValue().email;
        const { otp_code, new_password } = this.resetForm.value;

        this.authService.resetPassword(email,otp_code,new_password).subscribe({
            next: (response) => {
                this.isLoading = false;
                this.message = response.message || 'Contraseña restablecida exitosamente. Ahora puedes iniciar sesión con tu nueva contraseña.';

                setTimeout(() => {
                    this.router.navigate(['/login']);
                }, 4000);
            },
            error: (err) => {
                this.isLoading = false;
                this.errorMessage = err.error?.message || 'Ocurrió un error al restablecer la contraseña. Por favor, intenta nuevamente.';
                console.error('Error al restablecer la contraseña:', err);
            }
        });
    }
}