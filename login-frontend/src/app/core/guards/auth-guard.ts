import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAutenticated = !!authService.currentUserValue || !!authService.getItem('access_token');
  if(isAutenticated) {
    return true;
  }

    console.log('Usuario no autenticado, redirigiendo al login');
    router.navigate(['/login']);

    return false;
};
